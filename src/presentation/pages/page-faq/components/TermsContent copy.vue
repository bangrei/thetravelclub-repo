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
          title: "Date of Last Revision: March 1, 2017",
          contents: [
            {
              numbering: "",
              title: `PLEASE READ THESE TERMS AND CONDITIONS OF USE CAREFULLY. BY ACCESSING OR USING
							THIS WEB SITE, YOU AGREE TO BE BOUND BY THE TERMS AND CONDITIONS DESCRIBED
							HEREIN AND ALL TERMS INCORPORATED BY REFERENCE. IF YOU DO NOT AGREE TO ALL OF
							THESE TERMS, DO NOT USE THIS WEB SITE.`,
              items: [],
            },
          ],
        },
        {
          title: "1. Scope of these Site Terms and Changes to the Site Terms",
          contents: [
            {
              numbering: "",
              title: `These terms and conditions of use ("Site Terms") exclusively apply to your access to, and use of,
							the Web site of Columbia Sportswear Company, 14375 N.W. Science Park Drive, Portland, OR
							97229, USA and its subsidiaries (collectively, "Columbia", “we” or “us”), located
							at <a href="www.columbiasportswear.co.uk">www.columbiasportswear.co.uk</a> (the "Site"). These Site Terms do not alter in any way the
							terms or conditions of any other agreement you may have with Columbia, or its affiliates, for
							products, services or otherwise. If you are using the Site on behalf of any entity, you represent
							and warrant that you are authorized to accept these Site Terms on such entity's behalf, and that
							such entity agrees to indemnify you and Columbia for violations of these Site Terms.`,
              items: [],
            },
            {
              numbering: "",
              title: `Columbia reserves the right to change or modify any of the terms and conditions contained in
							the Site Terms or any policy or guideline of the Site, at any time and in its sole discretion.
							Columbia will notify you that the Site Terms have been changed by email or by posting the
							revised Site Terms on the Site and posting a notice about such changes on the Site. Any
							changes or modification will be effective immediately upon posting of the revisions on the Site
							and shall apply to all use of the Site and all acts or omissions occurring after the effective date
							of the revised Site Terms. You waive any right you may have to receive specific notice of such
							changes or modifications. Your continued use of this Site following the posting of changes or
							modifications will confirm your acceptance of such changes or modifications. Therefore, you
							should frequently review the Site Terms and applicable policies from time-to-time to
							understand the terms and conditions that apply to your use of the Site. If you do not agree to
							the amended terms, your license to use the Site will terminate and any further use will be
							unauthorized, so you must stop using the Site.`,
              items: [],
            },
          ],
        },
        {
          title: "2. Mobile Services and Contact Information",
          contents: [
            {
              numbering: "",
              title: `The Site may include certain features or services that are available via your mobile phone (the
							"Mobile Services"), such as the ability to upload content to your mobile phone or request order
							and shipping status messages or other alerts be sent to your mobile phone. In addition, you
							have the option, but are not required, to provide your mobile number in the registration
							process as part of your contact information. By using the Mobile Services, or by providing your
							mobile number as a contact point, you agree that we may communicate with you by SMS, MMS,
							text message or other electronic means to your mobile device and that certain information
							about your usage of the Mobile Services may be communicated to us. You understand that
							your carrier's normal messaging, data and other rates and fees will apply to these Mobile
							Services and other communications, and you should check with your carrier to find out what
							plans are available and how much they cost.`,
              items: [],
            },
          ],
        },
        {
          title: "3. Copyright and Limited License",
          contents: [
            {
              numbering: "",
              title: `Unless otherwise indicated in the Site, the Site and all content and other materials on the Site,
							including, without limitation, the Columbia logo, and all designs, text, graphics, pictures,
							information, data, software, sound files, other files and the selection and arrangement thereof
							(collectively, the "Site Materials") are the proprietary property of Columbia or its licensors or
							users and are protected by U.S. and international copyright laws.`,
              items: [],
            },
            {
              numbering: "",
              title: `You are granted a limited, non-sublicensable license to access and use the Site and
							electronically copy, and print to hard copy, portions of the Site Materials for your informational,
							non-commercial and personal use only. Such license is subject to these Site Terms and does not
							include: (a) any resale or commercial use of the Site or the Site Materials therein; (b) the
							collection and use of any product listings, pictures or descriptions; (c) the distribution, public
							performance or public display of any Site Materials, (d) modifying or otherwise making any
							derivative uses of the Site and the Site Materials, or any portion thereof; (e) use of any data
							mining, robots or similar data gathering or extraction methods; (f) downloading (other than the
							page caching) of any portion of the Site, the Site Materials or any information contained therein,
							except as expressly permitted on the Site; or (g) any use of the Site or the Site Materials other
							than for its intended purpose. Any use of the Site or the Site Materials other than as specifically
							authorized herein, without the prior written permission of Columbia, is strictly prohibited and
							will terminate the license granted herein. Such unauthorized use may also violate applicable
							laws including without limitation copyright and trademark laws and applicable communications
							regulations and statutes. Unless explicitly stated herein, nothing in these Site Terms shall be
							construed as conferring any license to intellectual property rights, whether by estoppel,
							implication or otherwise. This license is revocable at any time.`,
              items: [],
            },
            {
              numbering: "",
              title: `Credit for photographies on underwear product sheets: ©Vente-Privee.com, April 2017. A
							rved.`,
              items: [],
            },
          ],
        },
        {
          title: "4. Repeat Infringer Policy",
          contents: [
            {
              numbering: "",
              title: `Columbia has adopted a policy of terminating, in appropriate circumstances and at Columbia's
							sole discretion, subscribers or account holders who are deemed to be repeat infringers.
							Columbia may also at its sole discretion limit access to the Site and/or terminate the accounts
							of any users who infringe any intellectual property rights of others, whether or not there is any
							repeat infringement.`,
              items: [],
            },
          ],
        },
        {
          title: "5. Copyright Complaints",
          contents: [
            {
              numbering: "",
              title: `If you believe that anything on the Site infringes upon any copyright which you own or control,
							you may file a notification of such infringement with our Designated Agent as set forth below.`,
              items: [
                {
                  numbering: "",
                  title: `<br/>`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `Name of Agent Designated to Receive Notification of Claimed Infringement:
									John C. Motley`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `Full Address of Designated Agent to Which Notification Should be Sent:
									14375 NW Science Park Drive, Portland, OR 97229, USA`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `Telephone Number of Designated Agent: 00 1 503-985-4000`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `Facsimile Number of Designated Agent: 00 1 503-985-5012`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `E-Mail Address of Designated Agent: dmca@columbia.com`,
                  items: [],
                },
              ],
            },
            {
              numbering: "",
              title: `Please note that the information provided in your notification, including any personal
							information contained therein, may be forwarded to the person who has provided the allegedly
							infringing content, and your sending us such notification constitutes your consent to share this
							information with the alleged infringer.`,
              items: [],
            },
            {
              numbering: "",
              title: `You should also note that if you make any material misrepresentation in your notification that
							the material or activity is infringing, you will be liable for all damages, including costs and legal
							fees, incurred by us or the alleged infringer as the result of our relying upon such
							misrepresentation in removing or disabling access to the material or activity claimed to be
							infringing.`,
              items: [],
            },
            {
              numbering: "",
              title: `We may give notice of a claim of copyright infringement to our users by means of a general
							notice on the Site, electronic mail to a user's email address in our records, or by written
							communication sent by first-class mail to a user's address in our records.`,
              items: [],
            },
          ],
        },
        {
          title: "6. Trademarks",
          contents: [
            {
              numbering: "",
              title: `"Columbia," "Columbia Sportswear Company," "Columbia Interchange System," "Columbia River
							Lodge," "Bugaboo," "Bugabootoo," "Cyberpack," "Delta Hunter," "Interchange," "Tough Mother,"
							"GRT," "Omni-Dry," "Omni-Freeze," "OmniGrip," "OmniShield," "OmniShade," "Omni-Tech,"
							"PFG," "PHG," "Skeeter Beeter," "Storm Dry," "Techlite," "Tested Tough," "Timberwolf," and
							"Titanium," along with the Columbia diamond, three arrow circle - and the PHG logos, and other
							product or service names, logos and slogans of Columbia that may appear on this Site, are
							trademarks or registered trademarks of Columbia Sportswear Company or its subsidiaries in
							the United States and other countries , and may not be copied, imitated or used, in whole or in
							part, without the prior written permission of Columbia or the applicable trademark holder. You
							may not use any metatags or any other "hidden text" utilizing "Columbia" or any other name,
							trademark or product or service name of Columbia or its subsidiaries without our prior written
							permission. In addition, the look and feel of the Site, including all page headers, custom
							graphics, button icons and scripts, is the service mark, trademark and/or trade dress of
							Columbia and may not be copied, imitated or used, in whole or in part, without our prior
							written permission. All other trademarks, registered trademarks, product names and company
							names or logos mentioned in the Site are the property of their respective owners. Reference to
							any products, services, processes or other information, by trade name, trademark,
							manufacturer, supplier or otherwise does not constitute or imply endorsement, sponsorship or
							recommendation thereof by us.`,
              items: [],
            },
          ],
        },
        {
          title: "7. Hyperlinks",
          contents: [
            {
              numbering: "",
              title: `You are granted a limited, non-exclusive right to create a text hyperlink to the Site for noncommercial purposes, provided such link does not portray Columbia or any of its products and
							services in a false, misleading, derogatory or otherwise defamatory manner and provided
							further that the linking site does not contain any adult or illegal material or any material that is
							offensive, harassing or otherwise objectionable. This limited right may be revoked at any time.
							You may not use a Columbia logo or other proprietary graphic of Columbia to link to this Site
							without the express written permission of Columbia. Further, you may not use, frame or utilize
							framing techniques to enclose any Columbia trademark, logo or other proprietary information,
							including the images found at the Site, the content of any text or the layout/design of any page
							or form contained on a page on the Site without Columbia's express written consent. Except as
							noted above, you are not conveyed any right or license by implication, estoppel or otherwise in
							or under any patent, trademark, copyright or proprietary right of Columbia or any third party.`,
              items: [],
            },
            {
              numbering: "",
              title: `Columbia makes no claim or representation regarding, and accepts no responsibility for, the
							quality, content, nature or reliability of third-party Web sites accessible by hyperlink from the
							Site, or Web sites linking to the Site. Such sites are not under the control of Columbia and
							Columbia is not responsible for the contents of any linked site or any link contained in a linked
							site, or any review, changes or updates to such sites. Columbia provides these links to you only
							as a convenience, and the inclusion of any link does not imply affiliation, endorsement or
							adoption by Columbia of any site or any information contained therein. When you leave the
							Site, you should be aware that our terms and policies no longer govern. You should review the
							applicable terms and policies, including privacy and data gathering practices, of any site to
							which you navigate from the Site.`,
              items: [],
            },
          ],
        },
        {
          title: "8. Third Party Content",
          contents: [
            {
              numbering: "",
              title: `Columbia may run or allow advertisements and promotions from third parties on the Site or
							may otherwise provide or allow information about or links to third-party products or services
							on the Site. Your business dealings or correspondence with, or participation in promotions of,
							such third parties, and any terms, conditions, warranties or representations associated with
							such dealings or promotions, are solely between you and such third party. Columbia is not
							responsible or liable for any loss or damage of any sort incurred as the result of any such
							dealings or promotions or as the result of the presence of such non-Columbia advertisers or
							third party information on the Site.`,
              items: [],
            },
          ],
        },
        {
          title:
            "9. Advertisements and Promotions; Third-Party Products and Services",
          contents: [
            {
              numbering: "",
              title: `Columbia may run or allow advertisements and promotions from third parties on the Sites or
							may otherwise provide or allow information about or links to third-party products or services
							on the Sites. Your business dealings or correspondence with, or participation in promotions of,
							such third parties, and any terms, conditions, warranties or representations associated with
							such dealings or promotions, are solely between you and such third party. Columbia is not
							responsible or liable for any loss or damage of any sort incurred as the result of any such
							dealings or promotions or as the result of the presence of such non-Columbia advertisers or
							third party information on the Sites. However, the foregoing shall not apply to the extent that
							any loss or damage is the result of Columbia’s own negligence, fraud, willful injury or willful
							violation of law.`,
              items: [],
            },
          ],
        },
        {
          title: "10. User Content and Interactive Services or Areas",
          contents: [
            {
              numbering: "",
              title: `The Site may include discussion forums, blogs, product reviews, or other interactive areas or
							services ("Interactive Areas”) in which you or other users create, post or store any content,
							messages, reviews, ratings, materials, data, information, text, music, sound, photos, video,
							graphics, code or other items or materials on the Site ("User Content"). You are solely
							responsible for your use of such Interactive Areas and use them at your own risk. By using any
							Interactive Areas, you agree not to post, upload to, transmit, distribute, store, create or
							otherwise publish through the Site any of the following:`,
              items: [
                {
                  numbering: "a",
                  title: ` User Content that is unlawful, libelous, defamatory, obscene, pornographic, indecent,
									lewd, suggestive, harassing, threatening, invasive of privacy or publicity rights, abusive,
									inflammatory, fraudulent or otherwise objectionable;`,
                  items: [],
                },
                {
                  numbering: "b",
                  title: ` User Content that you know or have reason to know is inaccurate, untruthful or misleading;`,
                  items: [],
                },
                {
                  numbering: "c",
                  title: `User Content that would constitute, encourage or provide instructions for a criminal
									offense, violate the rights of any party, or that would otherwise create liability or violate
									any local, state, national or international law or regulation;`,
                  items: [],
                },
                {
                  numbering: "d",
                  title: `User Content that may infringe any patent, trademark, trade secret, copyright or
									other intellectual or proprietary right of any party. By posting any User Content, you
									represent and warrant that you have the lawful right to distribute and reproduce such User Content;`,
                  items: [],
                },
                {
                  numbering: "e",
                  title: `User Content that impersonates any person or entity or otherwise misrepresents your affiliation with a person or entity;`,
                  items: [],
                },
                {
                  numbering: "f",
                  title: `Unsolicited promotions, political campaigning, advertising or solicitations;`,
                  items: [],
                },
                {
                  numbering: "g",
                  title: `Private information of any third party, including, without limitation, addresses, phone
									numbers, email addresses, Social Security numbers and credit card numbers;`,
                  items: [],
                },
                {
                  numbering: "h",
                  title: `Viruses, corrupted data or other harmful, disruptive or destructive files; and`,
                  items: [],
                },
                {
                  numbering: "i",
                  title: `User Content that, in the sole judgment of Columbia, is objectionable or which
									restricts or inhibits any other person from using or enjoying the Interactive Areas or the
									Site, or which may expose Columbia or its users to any harm or liability of any type.`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `<br/>`,
                  items: [],
                },
              ],
            },
            {
              numbering: "",
              title: `Columbia takes no responsibility and assumes no liability for any User Content posted, stored
							or uploaded by you or any third party, or for any loss or damage thereto, nor is Columbia liable
							for any mistakes, defamation, slander, libel, omissions, falsehoods, obscenity, pornography or
							profanity you may encounter. Your use of Interactive Areas is at your own risk. As a provider of
							interactive services, Columbia is not liable for any statements, representations or User Content
							provided by its users in any public forum, personal home page or other Interactive Area.
							Although Columbia has no obligation to screen, edit or monitor any of the Content posted in
							any Interactive Area, Columbia reserves the right, and has absolute discretion, to remove,
							screen or edit any User Content posted or stored on the Site at any time and for any reason
							without notice, and you are solely responsible for creating backup copies of and replacing any
							User Content you post or store on the Site at your sole cost and expense. Any use of the
							Interactive Areas or other portions of the Site in violation of the foregoing violates these Site
							Terms and may result in, among other things, termination or suspension of your rights to use
							the Interactive Areas and/or the Site. In order to cooperate with legitimate governmental
							requests, subpoenas or court orders, to protect Columbia's systems and customers, or to
							ensure the integrity and operation of Columbia's business and systems, Columbia may access
							and disclose any information it considers necessary or appropriate, including, without
							limitation, user profile information (i.e. name, e-mail address, etc.), IP addressing and traffic
							information, usage history, and posted User Content. Columbia's right to disclose any such
							information shall govern over any terms of Columbia's Privacy Policy.`,
              items: [],
            },
          ],
        },
        {
          title: "11. Rights in User Content and Submissions",
          contents: [
            {
              numbering: "",
              title: `Except as otherwise expressly stated by Columbia, Columbia does not claim ownership of any
							User Content or other materials you post or upload on the Site or otherwise provide or submit
							to Columbia. However, unless we indicate otherwise, you grant Columbia and its affiliates a
							non-exclusive, royalty-free, perpetual, irrevocable and fully sublicensable right to use,
							reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform
							and display such User Content throughout the world in any media. Such license shall be limited
							to use on or in connection with the Site unless otherwise indicated on the Site. You grant
							Columbia and its affiliates and sublicensees the right to use the name that you submit in
							connection with such content, if they choose. You represent and warrant that (a) you own and
							control all of the rights to the User Content that you post or you otherwise have the right to
							post such User Content to the Site; (b) the User Content is accurate and not misleading; and (c)
							use and posting of the User Content you supply does not violate these Site Terms and will not
							violate any rights of or cause injury to any person or entity.`,
              items: [],
            },
            {
              numbering: "",
              title: `Notwithstanding the foregoing, you acknowledge and agree that any suggestions, ideas,
							comments or other information or materials regarding the Site, Columbia or Columbia's
							products or services that are provided by you, whether by email, posting to the Site or
							otherwise, are non-confidential and shall become the sole property of Columbia. Columbia
							shall own exclusive rights, including all intellectual property rights, and shall be entitled to the
							unrestricted use and dissemination of these materials for any purpose, commercial or
							otherwise, without acknowledgment or compensation to you.`,
              items: [],
            },
          ],
        },
        {
          title: "12. User Conduct",
          contents: [
            {
              numbering: "",
              title: `By using the Site, you agree to abide by the Columbia Code of Conduct, which states that you agree not to:`,
              items: [
                {
                  numbering: "",
                  title: `Use the Site or Interactive Areas in any unlawful manner or in any manner that could
									damage, disable, overburden or impair the Site;`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `Harvest or collect email addresses or other contact information of other users from the
									Site or Interactive Areas by electronic or other means for the purposes of sending
									unsolicited emails or other unsolicited communications;`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `Use any robot, spider, crawler, scraper or other automated means or interface not
									provided by us to access the Site and/or Interactive Areas or to extract data;`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `Use automated scripts to collect information from or otherwise interact with the Site or Interactive Areas;`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `Register for more than one User account, register for a User account on behalf of an
									individual other than yourself, or register for a User account on behalf of any group or
									entity;`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `Impersonate any person or entity or otherwise misrepresent your age or you affiliation with a person or entity;`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `Violate any local, state, national or international law;`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `Solicit personal information from anyone under 18 or solicit passwords or personally
									identifying information for commercial or unlawful purposes;`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `Use or attempt to use another's account without authorization from Columbia;`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `Attempt to circumvent any content filtering techniques we may employ;`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `Attempt to access any service or area of the Site (including, without limitation, any
									Interactive Areas) that you are not authorized to access; or`,
                  items: [],
                },
                {
                  numbering: "",
                  title: `Engage in any harassing, intimidating, predatory or stalking conduct.`,
                  items: [],
                },
              ],
            },
            {
              numbering: "",
              title: `Columbia is not responsible or liable for the conduct of, or your interactions with, users of the
							Site (whether online or offline), nor is Columbia responsible or liable for any loss, damage,
							injury, or harm associated therewith. Although Columbia has no obligation to monitor any user
							conduct on the Site or in any Interactive Area, Columbia reserves the right, and has absolute
							discretion, to monitor any user conduct on the Site at any time and for any reason without
							notice. Columbia does not approve or endorse any user-posted meetings or events referenced
							on the Site, and Columbia recommends exercising caution before contacting or meeting
							anyone (online or offline) that is unfamiliar. Your use of the Site is at your own risk. Any use of
							the Site in violation of the user conduct rules set forth above violates these Site Terms and may
							result in, among other things, termination or suspension of your rights to use the Interactive
							Areas and/or the Site.`,
              items: [],
            },
          ],
        },
        {
          title: "13. Registration Data; Account Security",
          contents: [
            {
              numbering: "",
              title: `In consideration of your use of the Site, you agree to (a) provide accurate, current and complete
							information about you as may be prompted by any registration forms on the Site ("Registration
							Data"); (b) maintain the security of your password and identification and not share such
							information with any third party; (c) maintain and promptly update the Registration Data, and
							any other information you provide to Columbia, to keep it accurate, current and complete; and
							(d) accept all risks of unauthorized access to the Registration Data and any other information
							you provide to Columbia.`,
              items: [],
            },
          ],
        },
        {
          title: "14. Financial Material Disclosure",
          contents: [
            {
              numbering: "",
              title: `Press Releases. The information contained within press releases issued by Columbia should not
							be deemed accurate or current except as of the date the release was posted. Columbia has no
							intention of updating, and specifically disclaims any duty to update, the information in the press releases.`,
              items: [],
            },
            {
              numbering: "",
              title: `Third-Party Financial Information. Columbia may provide links to third-party Web sites or
							services that contain financial or investment information about Columbia. Access to such Web
							sites and the information contained therein is provided as service to those interested in the
							information. Columbia neither regularly monitors nor has control over the content of third
							parties' statements or Web sites. Accordingly, Columbia does not endorse or adopt these Web
							sites or any information contained therein, including, without limitation, analyst's reports and
							stock quotes. Columbia makes no representations or warranties whatsoever regarding the
							accuracy or completeness of the content, information, or opinions of third-party Web sites or
							other third-party information that is identified on the Site. Users visit these Web sites and use
							the information contained therein at their own risk.`,
              items: [],
            },
          ],
        },
        {
          title: "15. Indemnification",
          contents: [
            {
              numbering: "",
              title: `You agree to defend, indemnify and hold harmless Columbia, its independent contractors,
							service providers and consultants, and their respective directors, employees and agents, from
							and against any claims, damages, costs, liabilities and expenses (including, but not limited to,
							reasonable legal fees) arising out of or related to any User Content you post, store or otherwise
							transmit on or through the Site or your use of the Interactive Areas, including without limitation
							any actual or threatened suit, demand or claim made against Columbia and/or its independent
							contractors, service providers, employees, directors or consultants, arising out of or relating to
							the User Content, your conduct, your violation of these Site Terms or your violation of the rights
							of any third party.`,
              items: [],
            },
          ],
        },
        {
          title: "16. Disclaimer",
          contents: [
            {
              numbering: "",
              title: `EXCEPT AS EXPRESSLY PROVIDED TO THE CONTRARY IN WRITING BY COLUMBIA, THE SITE, THE
							SITE MATERIALS CONTAINED THEREIN (INCLUDING ALL USER CONTENT) AND THE SERVICES
							PROVIDED ON OR IN CONNECTION THEREWITH (THE "SERVICES") ARE PROVIDED ON AN "AS IS"
							BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. COLUMBIA
							DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION,
							IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND
							NON-INFRINGEMENT AS TO THE INFORMATION, USER CONTENT AND SITE MATERIALS IN THE
							SITE. COLUMBIA DOES NOT REPRESENT OR WARRANT THAT THE SITE, THE SITE MATERIALS OR
							THE SERVICES ARE ACCURATE, COMPLETE, RELIABLE, CURRENT OR ERROR-FREE. COLUMBIA
							DOES NOT REPRESENT OR WARRANT THAT THE SITE OR ITS SERVERS ARE FREE OF VIRUSES OR
							OTHER HARMFUL COMPONENTS. COLUMBIA IS NOT RESPONSIBLE FOR THE CONDUCT,
							WHETHER ONLINE OR OFFLINE, OF ANY USER OF THE SITE OR THE SERVICE, AND YOU ARE
							SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER USERS. PRODUCT REVIEWS AND
							COMMENTS ARE STRICTLY THE OPINION OF THE USER POSTING SUCH REVIEWS OR
							COMMENTS, AND COLUMBIA DOES NOT ENDORSE OR APPROVE ANY SUCH REVIEWS OR
							COMMENTS. NOTHING IN THESE SITE TERMS AFFECTS YOUR STATUTORY RIGHTS AS A
							CONSUMER.`,
              items: [],
            },
            {
              numbering: "",
              title: `COLUMBIA IS NOT RESPONSIBLE FOR TYPOGRAPHICAL ERRORS OR OMISSIONS RELATING TO
							PRICING, TEXT OR PHOTOGRAPHY. WHILE COLUMBIA ATTEMPTS TO MAKE YOUR ACCESS AND
							USE OF THE SITE AND THE SERVICES SAFE, COLUMBIA CANNOT AND DOES NOT REPRESENT OR
							WARRANT THAT THE SITE OR ITS SERVER(S) ARE FREE OF VIRUSES OR OTHER HARMFUL
							COMPONENTS; THEREFORE, YOU SHOULD USE INDUSTRY-RECOGNIZED SOFTWARE TO DETECT
							AND DISINFECT VIRUSES FROM ANY DOWNLOAD.`,
              items: [],
            },
            {
              numbering: "",
              title: `Columbia reserves the right to change any and all content contained in the Site and any
							Services offered through the Site at any time without notice. Reference to any products,
							services, processes or other information, by trade name, trademark, manufacturer, supplier or
							otherwise does not constitute or imply endorsement, sponsorship or recommendation thereof,
							or any affiliation therewith, by Columbia.`,
              items: [],
            },
          ],
        },
        {
          title: "17. Limitation of Liability",
          contents: [
            {
              numbering: "",
              title: `IN NO EVENT SHALL COLUMBIA, ITS DIRECTORS, MEMBERS, EMPLOYEES OR AGENTS BE LIABLE
							FOR ANY DIRECT, SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES, OR ANY OTHER DAMAGES
							OF ANY KIND, INCLUDING BUT NOT LIMITED TO LOSS OF USE, LOSS OF PROFITS OR LOSS OF
							DATA, WHETHER IN AN ACTION IN CONTRACT, TORT (INCLUDING BUT NOT LIMITED TO
							NEGLIGENCE) OR OTHERWISE, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OF
							OR INABILITY TO USE THE SITE, THE SERVICES, THE USER CONTENT OR THE SITE MATERIALS
							CONTAINED IN OR ACCESSED THROUGH THE SITE, INCLUDING WITHOUT LIMITATION ANY
							DAMAGES CAUSED BY OR RESULTING FROM RELIANCE BY USER ON ANY INFORMATION
							OBTAINED FROM COLUMBIA, OR THAT RESULT FROM MISTAKES, OMISSIONS, INTERRUPTIONS,
							DELETION OF FILES OR EMAIL, ERRORS, DEFECTS, VIRUSES, DELAYS IN OPERATION OR
							TRANSMISSION OR ANY FAILURE OF PERFORMANCE, WHETHER OR NOT RESULTING FROM
							ACTS OF GOD, COMMUNICATIONS FAILURE, THEFT, DESTRUCTION OR UNAUTHORIZED ACCESS
							TO COLUMBIA'S RECORDS, PROGRAMS OR SERVICES. IN NO EVENT SHALL THE AGGREGATE
							LIABILITY OF COLUMBIA, WHETHER IN CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE,
							WHETHER ACTIVE, PASSIVE OR IMPUTED), PRODUCT LIABILITY, STRICT LIABILITY OR OTHER
							THEORY, ARISING OUT OF OR RELATING TO THE USE OF OR INABILITY TO USE THE SITE EXCEED
							ANY COMPENSATION YOU PAY, IF ANY, TO COLUMBIA FOR ACCESS TO OR USE OF THE SITE.
							NOTHING IN THESE SITE TERMS SHALL SERVE TO EXCLUDE OR RESTRICT THE LIABILITY OF
							COLUMBIA FOR DEATH OR PERSONAL INJURY CAUSED BY COLUMBIA’S NEGLIGENCE OR THAT
							OF ITS EMPLOYEES, FOR FRAUDULENT MISREPRESENTATION OR FRAUDULENT CONCEALMENT,
							OR FOR ANY OTHER LIABILITY THAT CANNOT BE EXCLUDED OR RESTRICTED BY LAW.`,
              items: [],
            },
          ],
        },
        {
          title: "18. Applicable Law and Jurisdiction",
          contents: [
            {
              numbering: "",
              title: `These Site Terms and your use of the Site shall be governed by and construed in accordance
							with the laws of England and Wales, without resort to its conflict of law provisions. You hereby
							irrevocably and unconditionally consent and submit to the exclusive jurisdiction of the English
							courts over any suit, action or proceeding arising out of or in connection with these Site Terms.`,
              items: [],
            },
          ],
        },
        {
          title: "19. Termination",
          contents: [
            {
              numbering: "",
              title: `Notwithstanding any of these Site Terms, Columbia reserves the right, without notice and in its
							sole discretion, to terminate your license to use the Site, and to block or prevent future your
							access to and use of the Site.`,
              items: [],
            },
          ],
        },
        {
          title: "20. Severability",
          contents: [
            {
              numbering: "",
              title: `If any provision of these Site Terms shall be deemed unlawful, void or for any reason
							unenforceable, then that provision shall be deemed severable from these Site Terms and shall
							not affect the validity and enforceability of any remaining provisions.`,
              items: [],
            },
          ],
        },
        {
          title: "21. Questions & Contact Information",
          contents: [
            {
              numbering: "",
              title: `If you have any question regarding the use of the Site, please refer first to the Help Centre or
							the Frequently Asked Questions. Questions or comments about the Site may be directed to
							Columbia on <a href="https://helpcenter-columbia-eu.zendesk.com/hc/en-us/requests/new">this page</a> or by calling us at 0800 464 0876.`,
              items: [],
            },
            {
              numbering: "",
              title: `Privacy Policy: Please refer to our Privacy Policy for information on how Columbia collects, uses
							and discloses personally identifiable information from its users.`,
              items: [],
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
