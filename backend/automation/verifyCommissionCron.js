import User from "../models/user.model.js";
import PaymentProof from "../models/commissionProof.model.js";
import Commission from "../models/commission.model.js";
import cron from "node-cron";
import { sendMail } from "../utils/sendMail.js";

export const verifyCommissionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running verify commission cron...");

    // FIND APPROVED PAYMENT PROOFS
    const approvedProofs = await PaymentProof.find({ status: "Approved" });

    for (let proof of approvedProofs) {
      try {
        // FIND THE USER ASSOCIATED WITH THE PAYMENT PROOF
        const user = await User.findById(proof.userId);

        let updatedUserData = {};

        if (user) {
          // IF USER'S UNPAIDCOMMISSION IS GREATER THAN OR EQUAL TO THE AMOUNT OF THE PROOF:
          // REDUCED UNPAID COMMISSION BY THE PROOF AMOUNT
          if (user.unpaidCommision >= proof.amount) {
            updatedUserData = await User.findByIdAndUpdate(
              user._id,
              {
                $inc: {
                  unpaidCommision: -proof.amount,
                },
              },
              { new: true }
            );

            // UPDATE THE STATUS OF PROOF TO SETTLED, MEANING THE PAYMENT HAS BEEN VERIFIED AND CLEARED.
            await PaymentProof.findByIdAndUpdate(proof._id, {
              status: "Settled",
            });
          } else {
            // CASE WHERE PROOF AMOUNT EXCEEDS UNPAIND COMMISSION:
            updatedUserData = await User.findByIdAndUpdate(
              user._id,
              {
                unpaidCommision: 0,
              },
              { new: true }
            );
            console.log(updatedUserData);
            await PaymentProof.findByIdAndUpdate(proof._id, {
              status: "Settled",
            });
          }

          // RECORD THE COMMISSION IN THE DB, ASSOCIATING THE AMOUNT PAID WITH THE USER
          await Commission.create({
            amount: proof.amount,
            user: user._id,
          });

          const settlementDate = new Date(Date.now())
            .toString()
            .substring(0, 15);

          const subject = `Your Payment Has Been Successfully Verified And Settled`;

          const message = `Dear ${user.username},\n\nWe are pleased to inform you that your recent payment has been successfully verified and settled. Thank you for promptly providing the necessary proof of payment. Your account has been updated, and you can now proceed with your activities on our platform without any restrictions.\n\nPayment Details:\nAmount Settled: ${proof.amount}\nUnpaid Amount: ${updatedUserData?.unpaidCommision}\nDate of Settlement: ${settlementDate}\n\nBest regards,\nMohit Gupta & Team.`;

          sendMail({ email: user.email, subject, message });
        }
      } catch (error) {
        console.error(
          `Error processing commission proof for user ${proof.userId}: ${error.message}`
        );
      }
    }
  });
};
