import { RippleButton, RippleButtonRipples } from "@/components/animate-ui/components/buttons/ripple";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f2] pt-32 w-full">
      <div className="max-w-[1500px] mx-auto px-6 md:px-[80px] w-full">
        <h1 className="font-jakarta font-bold text-[48px] md:text-[64px] text-[#1d1d1d]">
          Contact
        </h1>
        <p className="font-jakarta text-[18px] md:text-[20px] text-[#656565] mt-4 max-w-[600px]">
          Let&apos;s talk about your next project, AI interfaces, or just say hello.
        </p>
        
        <div className="mt-20 flex flex-col md:flex-row gap-16">
          <form className="flex flex-col gap-6 w-full max-w-[600px]">
            <div className="flex flex-col gap-2">
              <label className="font-jakarta font-medium text-[#1d1d1d]">Name</label>
              <input type="text" className="border border-[#e4e4e4] rounded-[12px] p-4 bg-white font-jakarta focus:outline-none focus:border-[#1d1d1d]" placeholder="Your name" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-jakarta font-medium text-[#1d1d1d]">Email</label>
              <input type="email" className="border border-[#e4e4e4] rounded-[12px] p-4 bg-white font-jakarta focus:outline-none focus:border-[#1d1d1d]" placeholder="your@email.com" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-jakarta font-medium text-[#1d1d1d]">Message</label>
              <textarea rows={5} className="border border-[#e4e4e4] rounded-[12px] p-4 bg-white font-jakarta focus:outline-none focus:border-[#1d1d1d] resize-none" placeholder="Tell me about your project..."></textarea>
            </div>
            <RippleButton 
              type="submit" 
              variant="dark"
              className="bg-[#1d1d1d] text-white rounded-[12px] p-4 font-jakarta font-semibold hover:bg-black transition-colors self-start mt-4 px-8"
            >
              Send Message
              <RippleButtonRipples />
            </RippleButton>
          </form>
          
          <div className="flex flex-col gap-8 bg-white border border-[#e4e4e4] rounded-[24px] p-8 w-full max-w-[400px]">
            <h3 className="font-jakarta font-bold text-[24px] text-[#1d1d1d]">Other ways to connect</h3>
            <div className="flex flex-col gap-4">
              <a href="#" className="font-jakarta text-[18px] text-[#656565] hover:text-[#1d1d1d] transition-colors underline decoration-1 underline-offset-4">LinkedIn</a>
              <a href="#" className="font-jakarta text-[18px] text-[#656565] hover:text-[#1d1d1d] transition-colors underline decoration-1 underline-offset-4">Twitter / X</a>
              <a href="#" className="font-jakarta text-[18px] text-[#656565] hover:text-[#1d1d1d] transition-colors underline decoration-1 underline-offset-4">Dribbble</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
