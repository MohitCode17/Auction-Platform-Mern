import cron from "node-cron";
import Auction from "../models/auction.model.js";
import User from "../models/user.model.js";
import Bid from "../models/bid.model.js";
import { calculateCommission } from "../controllers/commission.controller.js";
import { sendMail } from "../utils/sendMail.js";

export const endedAuctionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const now = new Date().toISOString();
    // console.log("End auction cron running...");

    // FIND ENDED AUCTION LIST, WHERE THE COMMISSION HASN'T BEEN CALCULATED YET.
    const endedAuctions = await Auction.find({
      endTime: { $lt: now },
      commissionCalculated: false,
    });

    for (let auction of endedAuctions) {
      try {
        // FIND HIGHEST BID FOR ASSOCIATED AUCTION
        const highestBid = await Bid.findOne({
          auctionItem: auction._id, // It looks for bids made on the current auction.
          amount: auction.currentBid, //  It also filters by the bid amount, looking for the one that matches the current highest bid.
        });

        if (highestBid) {
          // UPDATE HIGHESTBIDDER FIELD IN AUCTION, WITH THE ID OF HIGHEST BID USER ID.
          auction.highestBidder = highestBid.bidder.id;

          // CALCULATE TOTAL COMMISSION AMOUNT
          const commissionAmount = await calculateCommission(auction._id);
          auction.commissionCalculated = true;
          await auction.save(); // SAVE THE INFORMATION

          // FIND AUCTIONEER AND BIDDER
          const bidder = await User.findById(highestBid.bidder.id);
          const auctioneer = await User.findById(auction.createdBy);

          // INCREMENT BIDDER'S MONEY SPENT & AUCTIONS WON
          await User.findByIdAndUpdate(
            bidder._id,
            {
              $inc: {
                moneySpent: highestBid.amount,
                auctionsWon: 1,
              },
            },
            { new: true }
          );

          // UPDATE AUCTIONEER'S UNPAID COMMISSION
          await User.findByIdAndUpdate(
            auctioneer._id,
            {
              $inc: {
                unpaidCommision: commissionAmount,
              },
            },
            { new: true }
          );

          // SEND MAIL TO HIGHEST BIDDER
          const subject = `Congratulations! You won the auction for ${auction.title}`;
          const message = `Dear ${bidder.username}, \n\nCongratulations! You have won the auction for ${auction.title}. \n\nBefore proceeding for payment contact your auctioneer via your auctioneer email:${auctioneer.email} \n\nPlease complete your payment using one of the following methods:\n\n1. **Bank Transfer**: \n- Account Name: ${auctioneer.paymentMethods.bankTransfer.bankAccountName} \n- Account Number: ${auctioneer.paymentMethods.bankTransfer.bankAccountNumber} \n- IFSC Code: ${auctioneer.paymentMethods.bankTransfer.ifscCode} \n- Bank: ${auctioneer.paymentMethods.bankTransfer.bankName}\n\n2. **Paypal**:\n- You can send payment via paypal: ${auctioneer.paymentMethods.paypal.paypalId}\n\n3. **Upi**:\n- You can send payment via upi: ${auctioneer.paymentMethods.upiId.upiId}\n\n4. **Cash on Delivery (COD)**:\n- If you prefer COD, you must pay 10% of the total amount upfront before delivery.\n- To pay the 10% upfront, use any of the above methods.\n- The remaining 90% will be paid upon delivery.\n- If you want to see the condition of your auction item then send your email on this: ${auctioneer.email}\n\nPlease ensure your payment is completed by next 10 days. Once we confirm the payment, the item will be shipped to you.\n\nThank you for participating!\n\nBest regards,\nMohit Gupta & Team`;

          console.log("SENDING EMAIL TO HIGHEST BIDDER");

          sendMail({ email: bidder.email, subject, message });

          console.log("SUCCESSFULLY EMAIL SEND TO HIGHEST BIDDER");
        } else {
          await auction.save();
        }
      } catch (error) {
        return next(
          console.error(error || "Some error in ended auction cron.")
        );
      }
    }
  });
};
