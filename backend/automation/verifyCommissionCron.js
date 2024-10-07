import User from "../models/user.model.js";
import PaymentProof from "../models/commissionProof.model.js";
import Commission from "../models/commission.model.js";
import cron from "node-cron";
import { sendMail } from "../utils/sendMail.js";

export const verifyCommissionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    // FIND APPROVED PAYMENT PROOFS
    const approvedProofs = await PaymentProof.find({ status: "Approved" });

    for (let proof of approvedProofs) {
      try {
        // FIND THE USER ASSOCIATED WITH THE PAYMENT PROOF
        const user = await User.findById(proof.userId);

        let updatedUserData = {};

        if (user) {
          // CHECK IF THE SUBMITTED PROOF AMOUNT MATCHES THE USER'S UNPAID COMMISSION EXACTLY
          if (user.unpaidCommision === proof.amount) {
            updatedUserData = await User.findByIdAndUpdate(
              user._id,
              {
                unpaidCommision: 0,
              },
              { new: true }
            );

            // UPDATE THE STATUS OF THE PAYMENT PROOF TO "SETTLED"
            await PaymentProof.findByIdAndUpdate(proof._id, {
              status: "Settled",
            });

            // RECORD THE COMMISSION IN THE DB, ASSOCIATING THE AMOUNT PAID WITH THE USER
            await Commission.create({
              amount: proof.amount,
              user: user._id,
            });

            // SETTLEMENT CONFIRMATION EMAIL
            const settlementDate = new Date(Date.now())
              .toString()
              .substring(0, 15);

            const subject = `Your Payment Has Been Successfully Verified And Settled`;

            const message = `Dear ${user.username},\n\nWe are pleased to inform you that your recent payment has been successfully verified and settled. Thank you for promptly providing the necessary proof of payment. Your account has been updated, and you can now proceed with your activities on our platform without any restrictions.\n\nPayment Details:\nAmount Settled: ${proof.amount}\nUnpaid Amount: ${updatedUserData?.unpaidCommision}\nDate of Settlement: ${settlementDate}\n\nBest regards,\nMohit Gupta & Team.`;

            sendMail({ email: user.email, subject, message });
          } else {
            // CASE WHERE PROOF AMOUNT DOES NOT MATCH THE UNPAID COMMISSION
            console.log(
              `Payment proof amount (${proof.amount}) does not match the user's unpaid commission (${user.unpaidCommision}). Skipping settlement for user ${user._id}.`
            );
          }
        }
      } catch (error) {
        console.error(
          `Error processing commission proof for user ${proof.userId}: ${error.message}`
        );
      }
    }
  });
};
