import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Visual Studio's privacy policy to understand how we collect, use, and protect your personal information.",
  keywords: ["privacy policy", "Visual Studio privacy", "data protection", "personal information"],
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPage() {
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
            className="text-[14.5px] font-medium text-[#555] dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#1c1c1c] dark:hover:text-white rounded-full px-[30px] py-[10px] transition-all whitespace-nowrap"
          >
            Terms and Conditions
          </Link>
          <Link 
            href="/privacy-policy" 
            className="text-[14.5px] font-medium bg-[#1c1c1c] dark:bg-white text-white dark:text-black rounded-full px-[30px] py-[10px] shadow-[0_1px_6px_rgba(0,0,0,0.2)] transition-all whitespace-nowrap"
          >
            Privacy Policy
          </Link>
        </div>
      </div>

      <div className="container max-w-[720px] mx-auto px-6 mt-12">
        {/* Panel Title */}
        <div className="font-serif text-[clamp(30px,3.5vw,42px)] font-normal text-center text-foreground tracking-[-0.01em] pb-12">
          Privacy Policy
        </div>
        
        <div className="text-[14.5px] md:text-[15px] leading-[1.75] text-foreground/80">
          <div className="mb-11">
            <h3 className="text-[14.5px] font-bold text-foreground mb-1.5">Notice of Updated Privacy Policy</h3>
            <p>This Privacy Policy is effective as of April 26, 2026, for all clients and visitors. By continuing to use our website or services after this date, you agree to the updated Privacy Policy. We reserve the right to modify this policy at any time. If we make material changes, we will update the date at the top of this page.</p>
          </div>

          <p className="mb-4">This Privacy Policy describes how Visual Studio & Events (operating under <strong className="font-semibold text-foreground">Visual Ink LLC</strong>) handles personal information that we collect through our website at <Link href="https://www.visualstudioslens.com" className="text-foreground hover:underline">visualstudioslens.com</Link> and through our services. Our services are designed to help clients capture and preserve their most meaningful moments.</p>
          <p className="mb-4">For purposes of applicable data protection laws, Visual Ink LLC is the controller of your personal information.</p>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 01 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">01</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5 mt-0">Personal Information We Collect</h2>
            <p className="mb-4">We obtain information about you through the means described below when we provide our services. The type of information we collect depends on the features you use and services you engage. If you do not provide us with such information, you may no longer be able to access or use certain service features.</p>
            <p className="mb-4"><strong className="font-semibold text-foreground">Information you provide to us:</strong> Personal information you may provide through our website or services includes:</p>
            <ul className="list-disc pl-[22px] mb-[18px] space-y-[7px]">
              <li><strong className="font-semibold text-foreground">Contact Information:</strong> Name, email address, phone number, and mailing address</li>
              <li><strong className="font-semibold text-foreground">Event Information:</strong> Event date, venue, type, and details shared during consultation or booking</li>
              <li><strong className="font-semibold text-foreground">Payment Information:</strong> Transaction records and billing details (we do not store full card numbers)</li>
              <li><strong className="font-semibold text-foreground">Communications:</strong> Messages, emails, and inquiry forms submitted through our website or directly to our team</li>
              <li><strong className="font-semibold text-foreground">Account Information:</strong> Login credentials and preferences if you create an account on our client portal</li>
            </ul>
            <p className="mb-4"><strong className="font-semibold text-foreground">Information collected automatically:</strong> When you visit our website, we automatically collect certain technical information, including IP address, browser type and version, pages visited, time spent on pages, and referring URLs through standard analytics tools.</p>
          </div>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 02 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">02</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5">How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-[22px] mb-[18px] space-y-[7px]">
              <li>Process and fulfill your booking and service requests</li>
              <li>Communicate with you about your project, event, or inquiry</li>
              <li>Send booking confirmations, invoices, contracts, and delivery notifications</li>
              <li>Send occasional promotional content, studio updates, and special offers (you may opt out at any time)</li>
              <li>Improve our website and services through analytics and feedback</li>
              <li>Maintain records as required for legal, accounting, or business purposes</li>
              <li>Comply with applicable laws and legal obligations</li>
            </ul>
            <p className="mb-4">In addition, when using certain services, you will be subject to any additional terms applicable to such services that may be posted on our website from time to time, including, without limitation:</p>
            <ul className="list-disc pl-[22px] mb-[18px] space-y-[7px]">
              <li>the Terms of Service — <Link href="/terms-of-service" className="text-foreground hover:underline">visualstudioslens.com/terms-of-service</Link></li>
              <li>the Client Portal Agreement — <Link href="#" className="text-foreground hover:underline">visualstudioslens.com/client-portal</Link></li>
            </ul>
            <p className="mb-4">All such terms are hereby incorporated by reference into this Privacy Policy.</p>
          </div>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 03 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">03</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5">Information Sharing</h2>
            <p className="mb-4">We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following limited circumstances:</p>
            <ul className="list-disc pl-[22px] mb-[18px] space-y-[7px]">
              <li><strong className="font-semibold text-foreground">Service Partners:</strong> With trusted vendors (e.g., second photographers, editors, album printers) who are necessary to fulfill your booking and are bound by confidentiality obligations</li>
              <li><strong className="font-semibold text-foreground">Legal Requirements:</strong> When required by law, court order, subpoena, or governmental authority</li>
              <li><strong className="font-semibold text-foreground">Business Transfers:</strong> In connection with a merger, acquisition, reorganization, or sale of business assets, where your information may be transferred as part of that transaction</li>
              <li><strong className="font-semibold text-foreground">Protection of Rights:</strong> When we believe disclosure is necessary to protect the rights, property, or safety of Visual Studio, our clients, or others</li>
            </ul>
          </div>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 04 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">04</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5">Data Retention</h2>
            <p className="mb-4">We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, including for legal, accounting, or reporting requirements.</p>
            <p className="mb-4">Client project files and communications are generally retained for a minimum of <strong className="font-semibold text-foreground">3 years</strong> following project completion. Raw media files are maintained for <strong className="font-semibold text-foreground">60 days</strong> after final delivery, after which they may be permanently deleted.</p>
            <div className="border-l-[3px] border-[#b07d4a] bg-[#b07d4a]/5 dark:bg-[#b07d4a]/10 p-[15px_20px] my-[18px]">
              <div className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-[#b07d4a] mb-[7px]">Your Responsibility</div>
              <p className="text-[13.5px] text-foreground/70 m-0 leading-[1.7]">Clients are solely responsible for retaining their own copies of all delivered materials after handoff. Visual Studio cannot be held responsible for files lost after the 60-day backup window has expired.</p>
            </div>
          </div>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 05 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">05</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5">Your Rights</h2>
            <p className="mb-4">Depending on your location and applicable law, you may have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-[22px] mb-[18px] space-y-[7px]">
              <li><strong className="font-semibold text-foreground">Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong className="font-semibold text-foreground">Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong className="font-semibold text-foreground">Deletion:</strong> Request deletion of your personal data, subject to legal retention requirements</li>
              <li><strong className="font-semibold text-foreground">Opt-Out:</strong> Opt out of marketing communications at any time by replying &quot;unsubscribe&quot; to any email or contacting us directly</li>
              <li><strong className="font-semibold text-foreground">Portability:</strong> Request your data in a portable format where technically feasible</li>
            </ul>
            <p className="mb-4">To exercise any of these rights, please contact us at <Link href="mailto:lens@visualstudioslens.com" className="text-foreground hover:underline">lens@visualstudioslens.com</Link>. We will respond to your request within 30 days.</p>
          </div>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 06 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">06</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5">Security</h2>
            <p className="mb-4">We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include secure file transfer protocols, encrypted storage, and restricted access to client data.</p>
            <p className="mb-4">However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security. In the event of a data breach that affects your rights or freedoms, we will notify you as required by applicable law.</p>
          </div>

          <hr className="border-t border-foreground/10 my-11" />

          {/* 07 */}
          <div className="mb-11">
            <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#b07d4a] mb-1">07</span>
            <h2 className="font-serif text-[26px] font-bold text-foreground leading-[1.25] mb-3.5">Contact</h2>
            <p className="mb-4">For any privacy-related questions, concerns, or requests, please contact us through any of the following channels:</p>
            <ul className="list-disc pl-[22px] mb-[18px] space-y-[7px]">
              <li><strong className="font-semibold text-foreground">Email:</strong> <Link href="mailto:lens@visualstudioslens.com" className="text-foreground hover:underline">lens@visualstudioslens.com</Link></li>
              <li><strong className="font-semibold text-foreground">Phone:</strong> <Link href="tel:+19296275537" className="text-foreground hover:underline">+1 (929) 627-5537</Link></li>
              <li><strong className="font-semibold text-foreground">Address:</strong> Liberty Avenue Brooklyn, 1097 · New York, NY 11208</li>
              <li><strong className="font-semibold text-foreground">Website:</strong> <Link href="/contact" className="text-foreground hover:underline">visualstudioslens.com/contact</Link></li>
            </ul>
            <p className="mb-4">We aim to respond to all privacy-related inquiries within <strong className="font-semibold text-foreground">5 business days</strong>.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
