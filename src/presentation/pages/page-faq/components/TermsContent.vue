<template>
  <div>
    <div class="page">
      <div class="page__content__con align-left secondary-color-70">
        <div
          class="terms-content"
          v-for="(terms, i) in termsData"
          v-bind:key="i"
        >
          <p class="heading-5 bold">{{ terms.title }}</p>
          <div
            class="page__list body-2-normal"
            v-html="renderContents(terms.contents)"
          ></div>
        </div>
      </div>
      <div class="page__filler"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TermsContent",
  data() {
    return {
      termsData: [
        {
          title: "",
          contents: [
            {
              numbering: "",
              title: `HYDROFLASK.PH's ("HYDROFLASK","www.HYDROFLASK.ph", "we", "us") website(s) (our "Site" or "Sites") and related services are made available to you pursuant to the following Terms of Use & Service and any other rules posted on our Sites (collectively, the "TOS"). Please read the TOS carefully before placing any orders on HYDROFLASK.PH. We recommend you should keep a copy of the TOS for future reference.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `In particular, we wish to draw your attention to our policies relating to the terms of purchase within the TOS and our Privacy Policy. If you are under 18, you must let your parent or guardian knows about HYDROFLASK.PH's Privacy Policy before you register to use this Site or any of this Site's services. We reserve the right to only accept orders from those over 18 however.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `We may modify the TOS from time to time. Please read the TOS and check back often. If you do not agree to any change to the TOS, then you must immediately stop using the Site. Any changes made after you have placed an order will not affect that order however, unless we are required to make the change by law.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "REGISTRATION",
          contents: [
            {
              numbering: "",
              title: `To use some of the services or features made available to you on this Site, you will need to register. When you register, you are required to provide information about yourself that is true, accurate, current and complete in all respects. Should any of your registration information change, please notify us immediately at the following e-mail address shop@HYDROFLASK.PH. You may also want to view our Privacy Policy. We may change registration requirements from time to time.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "ELIGIBILITY TO PURCHASE",
          contents: [
            {
              numbering: "",
              title: `In order to make purchases through the Site, you will be requested to register and provide your personal details. In particular, Customers must provide their real name, phone number, e-mail address and other requested information as indicated. Furthermore, when ordering items, you will be required to provide payment details and you represent and warrant that the payment details you provide on ordering are both valid and correct and you confirm that you are the person referred to in the Billing information provided.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `The Site is available but not limited to individuals and others who meet the HYDROFLASK.PH terms of eligibility, who have been issued a valid credit card by a bank acceptable to HYDROFLASK.PH, whose applications are acceptable to HYDROFLASK.PH and who have authorized HYDROFLASK.PH to process a charge or charges on their credit card in the amount of the total purchase price for the merchandise which they purchase. HYDROFLASK.PH reserves the right to restrict multiple quantities of an item being shipped to any one customer or postal address.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `By making an offer to purchase merchandise, you expressly authorize us to perform credit checks and, where HYDROFLASK.PH feels necessary, to transmit or to obtain information (including any updated information) about you to or from third parties from time to time, including but not limited to your credit-card number or credit reports (including credit reports for your spouse if you reside in a community property jurisdiction), to authenticate your identity, to validate your credit card, to obtain an initial credit card authorization and to authorize individual purchase transactions.`,
              /* items: [], */
            },
          ],
        },
        {
          title:
            "Furthermore, you agree that we may use Personal information provided by you in order to conduct appropriate anti-fraud checks. Personal Information that you provide may be disclosed to a credit reference or fraud prevention agency, which may keep a record of that information.",
          contents: [
            {
              numbering: "",
              title: `Please refer to our Privacy Policy for further information about how we use your data.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "ORDERS",
          contents: [
            {
              numbering: "",
              title: `All orders are subject to acceptance and availability.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `HYDROFLASK.PH offers products for sale that are in stock and available for dispatch from our distribution center. Occasionally, however, we may be waiting for shipments from our designer suppliers. Consequently you may from time to time be given the possibility of making an Advance Payment for certain items in which case you are able to make an Advance Purchase. This will ensure that you receive this item in priority once designer stock has been delivered to HYDROFLASK.PH. HYDROFLASK.PH will only take Advance Purchase orders for stock that has been scheduled for delivery by a designer/supplier. Your rights regarding Advance Purchase are the same as those for any other purchase at HYDROFLASK.PH. Alternatively, you may simply choose to register your email address for notification of arrival of the selected merchandise not held in stock.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `Items received into stock may be pre-allocated to satisfy Advance Payment orders and customers making Advance Payments will receive items in priority to customers on the Waiting List or customers ordering through the Site for immediate delivery. Please be aware that we may be unable to deliver selected Advance Payment merchandise due to production problems or quality check issues identified when we receive an order into stock. In these circumstances we will notify you by email and refund the Advance Payment to your credit card within thirty days of being advised that merchandise has become unavailable.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `If you have registered your email address for notification of the arrival of a specific product featured on our Site, we will attempt to notify you by email within 48 hours of the product becoming available on the Site. Please note that on occasion certain products that are in particularly high demand will sell out during this period.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `Please note that items in your shopping basket/cart are not reserved and may be purchased by other customers.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "PRICING POLICY",
          contents: [
            {
              numbering: "",
              title: `Prices shown on the Site are in PHP (Philippine Pesos) and are inclusive of VAT at the applicable rate.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `All prices and offers remain valid as advertised from time to time. The PHP price of a product displayed on the Site at the time the order is accepted will be honored, except in cases of patent error.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `Product prices are set at the beginning of each season using existing currency exchange rates. These prices are subject to change if the applicable currency exchange rate changes before your order is accepted or the items are subject to markdowns at any time during the selling period.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `Customers purchasing from HYDROFLASK.PH will be charged for the items purchased and shipping costs only. Import duty or tax costs will be invoiced to you directly by the courier like DHL, FedEx, Air 21 or an import broker appointed by you, We recommend you contact your local customs authority to determine a landed cost price prior to purchase completion.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `If you are a customer whose credit card is not denominated in PHP, the final price will be calculated in accordance with the applicable exchange rate on the day your credit card company processes the transaction.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "ACCEPTANCE OF YOUR ORDER",
          contents: [
            {
              numbering: "",
              title: `Once you have made your choice and your order has been placed, you will receive an email acknowledging the details of your order. This email is not an acceptance of your order, just a confirmation that we have received it.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `Unless you cancel your order, acceptance of your order and completion of the contract between you and HYDROFLASK.PH will be completed when we email you to confirm the goods have been dispatched. The sale contract is therefore concluded in the Philippines where our operation center is located and the language of the contract is English.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `We reserve the right not to accept your order in the event, for example, that we are unable to obtain authorization for payment, that shipping restrictions apply to a particular item, that the item ordered is out of stock or does not satisfy our quality control standards and is withdrawn, or that you do not meet the eligibility criteria set out within the TOS.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `We may also refuse to process and therefore accept a transaction for any reason or refuse service to anyone at any time at our sole discretion. We will not be liable to you or any third party by reason of our withdrawing any merchandise from the Site whether or not that merchandise has been sold; removing, screening or editing any materials or content on the Site; refusing to process a transaction or unwinding or suspending any transaction after processing has begun.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "PAYMENT",
          contents: [
            {
              numbering: "",
              title: `Payment can be made by Visa, Visa Electron, MasterCard, American Express, Delta, and Maestro debit cards and any other methods which may be clearly advertised on the Site from time to time. Payment will be debited and cleared from your account upon dispatch of your order by HYDROFLASK.PH. You confirm that the credit/debit card that is being used is yours or that you have been specifically authorized by the owner of the credit/debit card to use it. All credit/debit card holders are subject to validation checks and authorization by the card issuer. If the issuer of your payment card refuses to authorize payment to HYDROFLASK.PH, we will not be liable for any delay or non-delivery.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `We take all reasonable care to make our Site secure. All credit card transactions on this site are processed using Paypal, Moneybookers and/or Smart Money.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `To help ensure that your shopping experience is safe, simple and secure HYDROFLASK.PH uses Secure Socket Layer (SSL) technology.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `Furthermore, we will take all reasonable care, in so far as it is in our power to do so, to keep the details of your order and payment secure, but in the absence of negligence on our part we cannot be held liable for any loss you may suffer if a third party procures unauthorized access to any data you provide when accessing or ordering from the Site.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "INSURANCE AND DELIVERY",
          contents: [
            {
              numbering: "",
              title: `HYDROFLASK.PH insures each purchase during the time it is in transit until it is delivered to your specified delivery address. We require a signature for any goods delivered, at which point responsibility for your purchased goods passes to you. If you have specified a recipient who is not you for delivery purposes (for example as a gift) then you accept that evidence of a signature by them (or at that delivery address) is evidence of delivery and fulfillment by HYDROFLASK.PH and transfer of responsibility in the same way.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `Please note that we aim to dispatch all orders within 48 hours. Estimated delivery times are to be used as a guide only and commence from the date of dispatch, HYDROFLASK.PH are not responsible for any delays caused by destination customs clearance processes.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "RETURN & EXCHANGE POLICY",
          contents: [
            {
              numbering: "",
              title: `All items sold at Res|Toe|Run go through our quality control procedures. We inspect every item before it is shipped, and all goods shipped are fully insured in case of loss or damage.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `However, there are times when the merchandise is damaged, defective, or incorrectly shipped.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `If this is the case:`,
              items: [
                {
                  title:
                    "1. Please email us at shop@HYDROFLASK.ph or send us a message at <dotcom's Contact Us Form> outlining the reason for your return, together with pictures of the merchandise and your Order Reference Number within 7 days upon receipt of items.",
                },
                {
                  title:
                    "2. Our customer service team will review your request and will provide the return instructions upon confirmation of your request.",
                },
                {
                  title:
                    "3. Once we receive the item/s, we will refund the amount of the total value of the purchased merchandise in the form of Store Credits that will be valid for one (1) year upon receipt of credits.",
                },
                {
                  title:
                    "4. If your courier has the option, we highly recommend for you to insure the items as it will be your responsibility to take reasonable care of the goods and will be liable for any damage to them until we receive them at our operations center. In case of dispute, we also recommend for you to retain the proof of sending.",
                },
                {
                  title:
                    "5. If the items shipped are defective or different from the ones you ordered, we will be shouldering the cost of all shipping fees incurred as well. All merchandise for return must be in original condition and in their original packaging.",
                },
              ],
            },
          ],
        },
        {
          title: "OUR POLICY",
          contents: [
            {
              numbering: "",
              title: `Items should be returned unused, and with all HYDROFLASK.PH and designer garment tags still attached. Returns that are damaged or soiled may not be accepted and may be sent back to the customer and/or a refund refused.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `Where provided, belts and any designer packaging such as authenticity cards, dust bags and leather tags should be included with your return.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `Please email shop@HYDROFLASK.PH if any of your purchases have been delivered without HYDROFLASK.PH tags.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `All items returned should have a Return Merchandise Authorization (RMA) number to ease the process. Unidentified returns may be returned to the sender.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "FAULTY GOODS POLICY",
          contents: [
            {
              numbering: "",
              title: `Goods are faulty if they are received damaged or where a manufacturing fault occurs within 1 month of purchase. Please note that items that are damaged as a result of normal wear and tear are not considered to be faulty.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `If you would like to exchange a faulty item, please be aware that we can only replace it for the same product in the same size, subject to availability. Where possible, we will offer to repair faulty items. If it cannot be repaired or the same product is not available, you are entitled to a full refund.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `You need to email us or notify us within 24 hours of receiving your order about faulty or damaged goods.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "COLORS",
          contents: [
            {
              numbering: "",
              title: `We have made every effort to display as accurately as possible the colors of our products that appear on HYDROFLASK.PH. However, as computer monitors vary, we cannot guarantee that your monitor's display of any color will be completely accurate.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "INTELLECTUAL PROPERTY RIGHTS",
          contents: [
            {
              numbering: "",
              title: `Your use of the Sites and its contents grants no rights to you in relation to any copyright, designs, trademarks and any other intellectual property and material rights relating to the Content (as described in the Content section below), including HYDROFLASK.PH Software and all HTML and other code contained in this Site. All such Content, including third party trademarks, designs and related intellectual property rights mentioned or displayed on this Site are protected by national intellectual property and other laws and international treaty provisions. You are permitted to use the Content only as expressly authorized by HYDROFLASK.PH and/or its third party licensors. Any reproduction or redistribution of the above listed Content is prohibited and may result in civil and criminal penalties. Without limiting the foregoing, copying and use of the above listed materials to any other server, location or support for publication, reproduction or distribution is expressly prohibited. However, you are permitted to make one copy for the purposes of viewing Content for your own personal use.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "CONTENT",
          contents: [
            {
              numbering: "",
              title: `In addition to the Intellectual property rights mentioned above, "Content" is defined as any graphics, photographs, including all image rights, sounds, music, video, audio or text on this Site. HYDROFLASK.PH tries to ensure that the information on this site is accurate and complete. HYDROFLASK.PH does not promise that HYDROFLASK.PH's Content is accurate, error-free. HYDROFLASK.PH does not promise that the functional aspects of the Site or HYDROFLASK.PH's Content will be error free or that this Site, HYDROFLASK.PH Content or the server that makes it available are free of viruses or other harmful components. We always recommend that all users of the Internet ensure they have up to date virus checking software installed.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "NO COMMERCIAL USE",
          contents: [
            {
              numbering: "",
              title: `This Site is for your personal, non-commercial use only. You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, commercially exploit, create derivative works from, transfer, or sell any Content, software, products, or services contained within this Site. You may not use this Site, or any of its Content, to further any commercial purpose, including any advertising or advertising revenue generation activity on your own Site.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "YOUR ACTIVITY",
          contents: [
            {
              numbering: "",
              title: `You agree that you will be personally responsible for your use of this Site and for all of your communication and activity on and pursuant to this Site. If we determine that you are or have been engaged in prohibited activities, were not respectful of other users, or otherwise violated the TOS, we may deny you access to this Site on a temporary or permanent basis.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "THIRD-PARTY SITES",
          contents: [
            {
              numbering: "",
              title: `We may include hyperlinks on this Site to other websites or resources operated by parties other than HYDROFLASK.PH, including advertisers. HYDROFLASK.PH has not reviewed all of the sites linked to its Web Site and is not responsible for the content or accuracy of any off-site pages nor are we responsible for the availability of such external websites or resources, and do not endorse and are not responsible or liable, directly or indirectly, for the privacy practices or the content of such websites, including (without limitation) any advertising, products or other materials or services on or available from such websites or resources, nor for any damage, loss or offence caused or alleged to be caused by, or in connection with, the use of or reliance on any such content, goods or services available on such external websites or resources.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "LIMITS ON OUR LIABILITY",
          contents: [
            {
              numbering: "",
              title: `If HYDROFLASK.PH breaches the TOS we shall only be liable for losses which are direct losses and a reasonably foreseeable consequence of such a breach. Losses are foreseeable where, for example, they could be contemplated by you and HYDROFLASK.PH at the time of you placing your order, and HYDROFLASK.PH dispatching your order. We shall only be liable for losses up to 150% of the total value of goods purchased.`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `We are not responsible for losses not caused by our breach or negligence, indirect losses which are a side effect of the main loss or damage and which are not reasonably foreseeable by you and us (for example, loss of profits or loss of opportunity).`,
              /* items: [], */
            },
            {
              numbering: "",
              title: `We are also not responsible for failure to meet any of our obligations under the TOS where such failure is due to events which beyond our reasonable control.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "COMPENSATION",
          contents: [
            {
              numbering: "",
              title: `At our request, you agree to compensate us fully, defend us and hold us HYDROFLASK.PH harmless immediately on demand, its officers, directors, agents, affiliates, licensors, and suppliers, from and against all liabilities, claims, expenses, damages and losses, including legal fees, arising from any breach of the TOS by you including the use by any other persons accessing this Site using your Internet account caused by your action or inaction.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "OUR RELATIONSHIP",
          contents: [
            {
              numbering: "",
              title: `You acknowledge and agree that no joint venture, partnership, employment, or agency relationship exists between you and HYDROFLASK.PH as a result of the TOS or your use of this Site. You agree that you may not and will not hold yourself out as a representative, agent, or employee of HYDROFLASK.PH, and we shall not be liable for any representation, act, or omission on your part.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "NO WAIVER",
          contents: [
            {
              numbering: "",
              title: ``,
              /* items: [], */
            },
          ],
        },
        {
          title: "",
          contents: [
            {
              numbering: "",
              title: `If you breach the TOS and we take no action against you, we will still be entitled to use our rights and remedies in any other situation where you breach the TOS.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "GOVERNING LAW",
          contents: [
            {
              numbering: "",
              title: `The TOS together with all our policies and procedures will be governed by and construed in accordance the relevant Philippine law and the relevant courts of the Philippines will have exclusive jurisdiction.`,
              /* items: [], */
            },
          ],
        },
        {
          title: "CONTACT INFORMATION",
          contents: [
            {
              numbering: "",
              title: `HYDROFLASK.PH Customer Care can be reached via email at shop@HYDROFLASK.PH.`,
              /* items: [], */
            },
          ],
        },
      ],
    };
  },
  methods: {
    renderContents(contents) {
      if (!contents || contents.length == 0) return;
      let htmls = "";
      contents.forEach((content) => {
        var item = `<div class="terms-content">`;
        item += `<div class="terms-content-header">`;
        if (content.numbering)
          item += `<div class="terms-content-numbering">${content.numbering}.</div>`;
        item += `<div class="terms-content-label">${content.title}</div>`;
        item += `</div>`;
        if (content.items && content.items.length > 0) {
          item += this.renderContents(content.items);
        }
        item += `</div>`;
        htmls += item;
      });
      return htmls;
    },
  },
};
</script>

<style lang="scss">
.align-left {
  text-align: left;
}

.page {
  padding: 16px;
  display: flex;
  flex-direction: column;

  &__title {
    align-self: flex-start;
    margin-left: 16px;
  }

  &__content__con {
    display: flex;
    flex-direction: column;
    gap: 24px;

    p {
      margin-bottom: 12px;
    }
  }

  &__list {
    color: $secondary-color-70;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__filler {
    flex-grow: 1;
  }

  ol {
    padding-inline-start: 16px;
  }
  .terms-content .terms-content .terms-content {
    padding-left: 18px;
  }
  .terms-content .terms-content + .terms-content {
    margin-top: 6px;
  }
  .page__list + .page__list {
    margin-top: 12px;
  }
  .terms-content-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    .terms-content-numbering {
      width: 15px;
    }
    .terms-content-numbering + .terms-content-label {
      padding-left: 8px;
      flex: 1;
    }
  }
}
@media (min-width: 672px) {
  .page {
    padding: 24px 7% !important;
  }
}
</style>
