export function NewsletterTemplate() {
  return (
    <div className="w-full max-w-[600px] mx-auto bg-white">
      <div className="p-6">
        <img src="/placeholder.svg?height=40&width=120" alt="Logo" className="mb-6" />
        <div className="text-sm text-[#767676] mb-2">Welcome back to</div>
        <h1 className="text-2xl font-bold text-[#E31B54] mb-6">TECHTALK WEEKLY DIGEST</h1>
        <div className="mb-6">
          <p className="text-[#484848] mb-4">Hey Digital Enthusiasts! 👋</p>
          <p className="text-[#484848] mb-4">
            We trust your month is going swimmingly. Dive in, we've cooked up some exciting updates for you!
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-[#1A1A1A]">This Week's Spotlight</h2>
          <div className="text-[#E31B54] font-medium mb-4">
            Unveiling End-To-End Solutions
            <br />
            Tailored For Every Phase In The
            <br />
            Software Service Journey
          </div>
        </div>
      </div>
    </div>
  )
}

