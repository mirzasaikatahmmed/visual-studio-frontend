import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Visual Studio",
  description: "Terms and conditions for Visual Studio & Events.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 selection:bg-brand-500/30 font-sans">
      
      {/* ══ PAGE HERO ══ */}
      <div className="text-center px-6">
        <h1 className="font-serif text-[clamp(46px,5.5vw,68px)] font-normal text-foreground tracking-[-0.015em] leading-[1.12]">Terms & Privacy</h1>
      </div>

      {/* ══ TAB SWITCHER (as Links) ══ */}
      <div className="flex justify-center pt-10 px-6">
        <div className="inline-flex bg-[#e8e8e8] dark:bg-white/10 rounded-full p-[5px]">
          <Link 
            href="/terms-of-service" 
            className="text-[14.5px] font-medium bg-[#1c1c1c] dark:bg-white text-white dark:text-black rounded-full px-[30px] py-[10px] shadow-[0_1px_6px_rgba(0,0,0,0.2)] transition-all whitespace-nowrap"
          >
            Terms and Conditions
          </Link>
          <Link 
            href="/privacy-policy" 
            className="text-[14.5px] font-medium text-[#555] dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#1c1c1c] dark:hover:text-white rounded-full px-[30px] py-[10px] transition-all whitespace-nowrap"
          >
            Privacy Policy
          </Link>
        </div>
      </div>

      <div className="container max-w-[720px] mx-auto px-6 mt-12">
        {/* Panel Title */}
        <div className="font-serif text-[clamp(30px,3.5vw,42px)] font-normal text-center text-foreground tracking-[-0.01em] pb-12">
          Terms & Conditions
        </div>
        
        <div className="text-[14.5px] md:text-[15px] leading-[1.75] text-foreground/80">
          <div className="mb-11">
            <h3 className="text-[14.5px] font-bold text-foreground mb-1.5">Notice of Terms of Service</h3>
            <p>These Terms are effective immediately for new clients as of April 26, 2026, and apply to all services provided by Visual Studio & Events. By booking, paying, or engaging our services in any way, you agree to be bound by these Terms in their entirety.</p>
          </div>

          {/* 01 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">01</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5 mt-0">Acceptance of Terms</h2>
            <p className="mb-4">These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Client&quot;) and Visual Studio & Events, a creative photography and videography studio operating under <strong className="font-semibold text-foreground">Visual Ink LLC</strong>, headquartered in New York, NY.</p>
            <p className="mb-4">These Terms apply to all services rendered by Visual Studio, including but not limited to wedding photography, event videography, portrait sessions, corporate media, visual marketing productions, and any related deliverables.</p>
            <p className="mb-4">By accessing our website at <Link href="https://www.visualstudioslens.com" className="text-foreground hover:underline">visualstudioslens.com</Link>, submitting a booking inquiry, signing a service contract, or making any payment to Visual Studio, you confirm that you have read, understood, and agreed to be bound by these Terms in their entirety.</p>
            <p className="mb-4">We reserve the right to update these Terms at any time. Continued use of our website or services following any update constitutes your acceptance of the revised Terms. The most current version will always be available at <Link href="/terms-of-service" className="text-foreground hover:underline">visualstudioslens.com/terms</Link>.</p>
          </div>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 02 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">02</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5">Services Overview</h2>
            <p className="mb-4">Visual Studio provides professional photography, videography, and creative media services. Our current offerings include:</p>
            <ul className="list-disc pl-[22px] mb-[18px] space-y-[7px]">
              <li><strong className="font-semibold text-foreground">Wedding & Event Photography and Videography</strong> — Full-day or partial coverage of ceremonies, receptions, and cultural celebrations</li>
              <li><strong className="font-semibold text-foreground">Portrait & Lifestyle Sessions</strong> — Individual, couple, family, and professional headshot sessions</li>
              <li><strong className="font-semibold text-foreground">Corporate & Brand Media</strong> — Company events, product photography, executive headshots, and marketing campaigns</li>
              <li><strong className="font-semibold text-foreground">Visual Marketing Productions</strong> — Social media content, promotional reels, and branded visual assets</li>
              <li><strong className="font-semibold text-foreground">Events Decoration & Coordination</strong> — Curated décor setup and coordination for special events</li>
              <li><strong className="font-semibold text-foreground">Premium Print Albums</strong> — Custom-designed heirloom print albums and wall art</li>
            </ul>
            <p className="mb-4">Specific deliverables, hours of coverage, and package details will be outlined in your individual service agreement or booking confirmation. All services are subject to availability.</p>
          </div>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 03 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">03</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5">Booking & Payment</h2>
            <p className="mb-4"><strong className="font-semibold text-foreground">Retainer Fee:</strong> A non-refundable retainer of 50% of the total package price is required to secure your date. Your date is not reserved until this retainer is received and confirmed in writing by Visual Studio.</p>
            <p className="mb-4"><strong className="font-semibold text-foreground">Final Balance:</strong> The remaining balance is due no later than 14 days before the event or session date. Failure to pay the final balance by the due date may result in cancellation of services without refund of the retainer.</p>
            <p className="mb-4"><strong className="font-semibold text-foreground">Accepted Payment Methods:</strong></p>
            <ul className="list-disc pl-[22px] mb-[18px] space-y-[7px]">
              <li>Zelle / Bank Transfer (preferred)</li>
              <li>Credit or Debit Card (processing fee may apply)</li>
              <li>Cash (in-person, by arrangement)</li>
              <li>PayPal / Venmo (by arrangement)</li>
            </ul>
            
            <div className="border-l-[3px] border-[#b07d4a] bg-[#b07d4a]/5 dark:bg-[#b07d4a]/10 p-[15px_20px] my-[18px]">
              <div className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-[#b07d4a] mb-[7px]">Important</div>
              <p className="text-[13.5px] text-foreground/70 m-0 leading-[1.7]">All payments are in US Dollars (USD). Invoices not paid within the specified timeframe are subject to a late fee of 5% per week outstanding. Prices quoted are valid for 30 days from the date of the proposal.</p>
            </div>
          </div>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 04 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">04</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5">Cancellation & Refund Policy</h2>
            <p className="mb-4">The following policy applies to all cancellations:</p>
            <ul className="list-disc pl-[22px] mb-[18px] space-y-[7px]">
              <li><strong className="font-semibold text-foreground">90 or more days before the event:</strong> Retainer is forfeited; remaining balance is not due</li>
              <li><strong className="font-semibold text-foreground">30 to 89 days before the event:</strong> Retainer is forfeited; 25% of the remaining balance is due</li>
              <li><strong className="font-semibold text-foreground">Less than 30 days before the event:</strong> Full contract value is due and payable</li>
              <li><strong className="font-semibold text-foreground">Day-of cancellation:</strong> Full contract value is due; no exceptions</li>
            </ul>
            <p className="mb-4"><strong className="font-semibold text-foreground">Rescheduling:</strong> One complimentary rescheduling is permitted with at least 30 days&apos; notice, subject to availability. Additional rescheduling requests may incur a $150 administrative fee.</p>
            <p className="mb-4"><strong className="font-semibold text-foreground">Cancellation by Visual Studio:</strong> In the unlikely event that Visual Studio must cancel due to circumstances beyond our control, we will make every effort to provide a qualified replacement of equal caliber. If no replacement is secured, all payments made will be refunded in full within 14 business days.</p>
          </div>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 05 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">05</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5">Intellectual Property & Usage Rights</h2>
            <p className="mb-4">All photographs, video footage, edits, and creative works produced by Visual Studio are and shall remain the <strong className="font-semibold text-foreground">exclusive intellectual property of Visual Studio</strong>, protected under United States copyright law.</p>
            <p className="mb-4"><strong className="font-semibold text-foreground">Client License:</strong> Upon full payment, the Client is granted a non-exclusive, non-transferable, perpetual personal license to use the delivered content for personal, non-commercial purposes, including printing and sharing on personal social media.</p>
            <p className="mb-4">The following are <strong className="font-semibold text-foreground">prohibited without prior written consent</strong> from Visual Studio:</p>
            <ul className="list-disc pl-[22px] mb-[18px] space-y-[7px]">
              <li>Selling, licensing, or commercially distributing our work</li>
              <li>Applying filters, heavy edits, or overlays that materially alter the original work</li>
              <li>Removing or obscuring Visual Studio watermarks or credits</li>
              <li>Using delivered content in third-party commercial campaigns or advertisements</li>
            </ul>
            <div className="border-l-[3px] border-[#b07d4a] bg-[#b07d4a]/5 dark:bg-[#b07d4a]/10 p-[15px_20px] my-[18px]">
              <div className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-[#b07d4a] mb-[7px]">Portfolio Use</div>
              <p className="text-[13.5px] text-foreground/70 m-0 leading-[1.7]">Visual Studio reserves the right to use any delivered work in our portfolio, website, social media, and marketing materials unless a written confidentiality agreement has been executed prior to the event. Commercial licensing upgrades available at <Link href="mailto:lens@visualstudioslens.com" className="text-[#b07d4a] hover:underline">lens@visualstudioslens.com</Link>.</p>
            </div>
          </div>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 06 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">06</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5">Client Conduct & Cooperation</h2>
            <p className="mb-4">To ensure the best possible outcome for your event or session, all clients are asked to:</p>
            <ul className="list-disc pl-[22px] mb-[18px] space-y-[7px]">
              <li>Communicate the event timeline, venue details, and key moments at least 7 days in advance</li>
              <li>Designate a point-of-contact on the day of the event to guide group shots and coordinate timing</li>
              <li>Provide a safe and accessible working environment for our team and equipment</li>
              <li>Refrain from directing or interfering with our team&apos;s creative process during coverage</li>
              <li>Ensure all relevant guests and subjects are informed that photography and videography will occur</li>
            </ul>
            <p className="mb-4">Visual Studio reserves the right to refuse or terminate services at any event where our team is subjected to harassment, unsafe conditions, or conduct that prevents professional performance. In such cases, no refund will be issued.</p>
          </div>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 07 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">07</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5">Limitation of Liability</h2>
            <p className="mb-4">Visual Studio will exercise the highest degree of professional care and skill in all engagements. However, in the event of equipment failure, data corruption, acts of nature, or circumstances beyond our reasonable control, our total liability shall not exceed the <strong className="font-semibold text-foreground">total amount paid</strong> to us by the Client for the services in question.</p>
            <p className="mb-4">Visual Studio is not liable for:</p>
            <ul className="list-disc pl-[22px] mb-[18px] space-y-[7px]">
              <li>Loss or damage caused by venue restrictions or third-party interference</li>
              <li>Footage or images impaired by poor lighting conditions outside our reasonable control</li>
              <li>Delays or quality impacts caused by the Client&apos;s failure to communicate key event details</li>
              <li>Lost or stolen files after handoff to the Client</li>
              <li>Indirect, incidental, or consequential damages of any kind</li>
            </ul>
            <div className="border-l-[3px] border-[#b07d4a] bg-[#b07d4a]/5 dark:bg-[#b07d4a]/10 p-[15px_20px] my-[18px]">
              <div className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-[#b07d4a] mb-[7px]">File Backup Notice</div>
              <p className="text-[13.5px] text-foreground/70 m-0 leading-[1.7]">Visual Studio maintains raw file backups for 60 days following delivery. After this period, files may be permanently deleted. Clients are strongly encouraged to back up all delivered files immediately upon receipt.</p>
            </div>
          </div>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 08 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">08</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5">Delivery Timelines & Revisions</h2>
            <p className="mb-4">Expected delivery timelines for edited deliverables are as follows:</p>
            <ul className="list-disc pl-[22px] mb-[18px] space-y-[7px]">
              <li><strong className="font-semibold text-foreground">Portrait & Lifestyle Sessions:</strong> Up to 2 weeks from the session date</li>
              <li><strong className="font-semibold text-foreground">Corporate & Brand Media:</strong> Up to 3 weeks from the shoot date</li>
              <li><strong className="font-semibold text-foreground">Wedding & Event Coverage:</strong> 6 to 8 weeks from the event date</li>
              <li><strong className="font-semibold text-foreground">Short-form Video Productions:</strong> 2 to 4 weeks from the shoot date</li>
              <li><strong className="font-semibold text-foreground">Full-length Video Films:</strong> 6 to 10 weeks from the event date</li>
            </ul>
            <p className="mb-4">Timelines may vary during peak season (May through October). Rush delivery is available for an additional fee.</p>
            <p className="mb-4"><strong className="font-semibold text-foreground">Revisions:</strong> Each package includes a set number of revision rounds as specified in your service agreement. Revision requests must be submitted in writing within <strong className="font-semibold text-foreground">14 days of delivery</strong>. Requests submitted after this window, or exceeding the included revision rounds, will be billed at our standard hourly editing rate.</p>
          </div>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 09 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">09</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5">Privacy & Data Use</h2>
            <p className="mb-4">Visual Studio collects only the personal information necessary to provide and improve our services, including name, contact details, event information, and payment data. We do not sell or rent your personal information to third parties.</p>
            <p className="mb-4">By engaging our services, you consent to Visual Studio storing your contact and event details for the purpose of fulfilling your booking, communicating service updates, and sending occasional promotional materials. You may opt out of marketing communications at any time by contacting us directly.</p>
            <p className="mb-4">For full details, please review our <Link href="/privacy-policy" className="text-foreground hover:underline">Privacy Policy</Link>.</p>
          </div>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 10 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">10</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5">Governing Law & Dispute Resolution</h2>
            <p className="mb-4">These Terms shall be governed by and construed in accordance with the laws of the <strong className="font-semibold text-foreground">State of New York</strong>, without regard to conflict of law principles.</p>
            <p className="mb-4">In the event of any dispute arising from these Terms or the services provided, both parties agree to first attempt resolution through good-faith negotiation. If no resolution is reached within 30 days, disputes shall be submitted to binding arbitration in <strong className="font-semibold text-foreground">Queens County, New York</strong>, in accordance with the rules of the American Arbitration Association.</p>
            <p className="mb-4">Visual Studio reserves the right to seek injunctive or other equitable relief in any court of competent jurisdiction to protect its intellectual property or confidential information.</p>
            <p className="text-[13.5px] font-semibold text-foreground leading-[1.7] my-[18px]">PLEASE READ THESE TERMS CAREFULLY, AS THEY CONTAIN AN AGREEMENT TO ARBITRATE DISPUTES AND OTHER IMPORTANT INFORMATION REGARDING YOUR LEGAL RIGHTS, REMEDIES, AND OBLIGATIONS. BY BOOKING OR PAYING FOR OUR SERVICES, YOU AGREE TO RESOLVE ANY DISPUTES THROUGH BINDING ARBITRATION RATHER THAN IN COURT, EXCEPT AS PROVIDED HEREIN.</p>
          </div>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 11 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">11</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5">Contact Information</h2>
            <p className="mb-4">If you have any questions, concerns, or requests regarding these Terms of Service, please contact us:</p>
            <ul className="list-disc pl-[22px] mb-[18px] space-y-[7px]">
              <li><strong className="font-semibold text-foreground">Email:</strong> <Link href="mailto:lens@visualstudioslens.com" className="text-foreground hover:underline">lens@visualstudioslens.com</Link></li>
              <li><strong className="font-semibold text-foreground">Phone:</strong> <Link href="tel:+19296275537" className="text-foreground hover:underline">+1 (929) 627-5537</Link></li>
              <li><strong className="font-semibold text-foreground">Address:</strong> Liberty Avenue Brooklyn, 1097 · New York, NY 11208</li>
              <li><strong className="font-semibold text-foreground">Website:</strong> <Link href="https://www.visualstudioslens.com" className="text-foreground hover:underline">visualstudioslens.com</Link></li>
            </ul>
            <p className="mb-4">We aim to respond to all inquiries within 2 business days.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
