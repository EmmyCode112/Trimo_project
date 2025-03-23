import { images } from "../Components/assets/assets";
import Button from "@/Components/buttons/transparentButton";

const UseCases = () => {
  return (
    <div>
      <div className="w-full flex flex-col gap-[14px] items-center justify-center bg-gradient-to-r from-[#CB1E33] via-[#9A2444] to-[#383268] h-[504px] text-center">
        <h2 className="text-white font-semibold text-[48px] leading-[60px] lg:max-w-[60%]">
          Discover How TRIIMO Powers Your Communications
        </h2>
        <p className="text-[18px] font-medium text-white lg:max-w-[50%]">
          Explore real-world examples of how TRIIMO helps teams and businesses
          streamline messaging across multiple channels.
        </p>
      </div>
      <div className="flex flex-col py-[60px] gap-[47px]">
        <div className="pl-[105px] flex items-center gap-[96px]">
          <div className="flex flex-col gap-8 lg:basis-[45%]">
            <div className="flex flex-col gap-6">
              <img
                src={images.emailIcon}
                alt="messages"
                className="w-[48px] h-[48px]"
              />

              <h1 className="text-[#3F3E3E] text-[24px] font-semibold">
                For Marketing Teams: Maximize Your Campaign Impact
              </h1>
              <p className="text-[#767676] text-[18px] font-normal">
                Triimo centralizes all your messaging needs, making it easy to
                create, schedule, and analyze multi-channel campaigns in one
                place.
              </p>
            </div>
            <ul className="flex flex-col gap-5">
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" />
                <span>Personalize bulk messages with ease.</span>
              </li>
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" />
                <span>
                  Track open rates, click rates, and engagement metrics.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" />
                <span>
                  Automate recurring campaigns for consistent outreach.
                </span>
              </li>
            </ul>
          </div>
          <div className="lg:basis-[45%]">
            <img src={images.Desktop4} alt="desktop" />
          </div>
        </div>
        <div className="pr-[105px] flex items-center gap-[96px]">
          <div className="lg:basis-[45%]">
            <img src={images.Desktop5} alt="desktop" />
          </div>
          <div className="flex flex-col gap-8 lg:basis-[45%]">
            <div className="flex flex-col gap-6">
              <img
                src={images.flash}
                alt="messages"
                className="w-[48px] h-[48px]"
              />

              <h1 className="text-[#3F3E3E] text-[24px] font-semibold">
                For Developers: Seamless API intergrrations
              </h1>
              <p className="text-[#767676] text-[18px] font-normal">
                Triimo offers RESTful api to send SMS, WhatsApp, email, OTPs
                with just few lines of code.
              </p>
            </div>
            <ul className="flex flex-col gap-5">
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" />
                <span>Easy to follow API documentation</span>
              </li>
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" />
                <span>Real-time delivery updates via webhooks.</span>
              </li>
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" />
                <span>Scalable for high-volume messaging.</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pl-[105px] flex items-center gap-[96px]">
          <div className="flex flex-col gap-8 lg:basis-[45%]">
            <div className="flex flex-col gap-6">
              <img
                src={images.statIcon}
                alt="messages"
                className="w-[48px] h-[48px]"
              />

              <h1 className="text-[#3F3E3E] text-[24px] font-semibold">
                For Small to Medium Business: Engage Your Customers Better
              </h1>
              <p className="text-[#767676] text-[18px] font-normal">
                Triimo empowers businesses to manage customer communications
                through bulk messaging, automated workflows, and real-time
                analytics.
              </p>
            </div>
            <ul className="flex flex-col gap-5">
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" />
                <span>Send promotional SMS and emails effortlessly.</span>
              </li>
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" />
                <span>Automate customers follow-ups and reminders.</span>
              </li>
              <li className="flex items-center gap-3">
                <img src={images.Checked} className="h-7 w-7" />
                <span>Use templates for quick and consistent messaging</span>
              </li>
            </ul>
          </div>
          <div className="lg:basis-[45%]">
            <img src={images.Desktop6} alt="desktop" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start gap-8 pt-[35px] px-[140px]">
        <div className="flex flex-col gap-2">
          <h2 className="text-[#3F3E3E] text-[24px] font-semibold">
            Get Notified when we launch
          </h2>
          <p>
            Stay up to date with the latest news, announcements, and articles.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-[#D0D5DD] py-[10px] px-[14px] rounded-[8px] placeholder:text-[#A3A3A3] placeholder:text-[16px] text-[14px] w-[272px] outline-[#383268]"
          />
          <Button
            label="Subscribe"
            className="bg-[#383268] text-white rounded-[8px] px-[14px] py-[10px]"
          />
        </div>
      </div>
    </div>
  );
};
export default UseCases;
