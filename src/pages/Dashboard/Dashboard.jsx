import { Icons } from "../../assets/assets";
import MessageSentChart from "./MessageSentChart";
import NotificationAlert from "./NotificationAlert";
import TopCompaniesChart from "./TopCompaniesChart";
import RecentMessage from "./RecentMessage";
import "./Dashboard.css"

const Dashboard = ({handleLogout}) => {
  const cardsData = [
    {
      title: "message sent",
      amount: 0,
      interest: "100%",
    },
    {
      title: "Ongoing Campaigns",
      amount: 0,
      interest: "100%",
    },
    {
      title: "Recent Campaigns Performance",
      amount: 0,
      interest: "100%",
    },
    {
      title: "Current Wallet Ballance",
      amount: "$0.00",
      interest: "100%",
    },
  ];

  return (
    <>

<div onClick={handleLogout} className="cursor-pointer text-[#EBEBF0] py-2 px-6">
  <p>Logout</p>
</div>
      <div className="px-[31px] py-[32px]">
        <div className="flex justify-between align-center flex-wrap gap-[20px]">
          <header>
            <h1 className="text-[#1A1A1A] text-[24px] font-medium">
              Welcome to Your Triimo Dashboard
            </h1>
            <p className="text-[#767676] font-normal text-[15px]">
              Track your performance, manage campaigns, and stay updated with
              real-time insights.
            </p>
          </header>
          <search className="flex items-center gap-2 px-[10px] rounded-[8px] border border-[#D0D5DD] w-[300px] h-[44px]">
            <img
              src={Icons.searchIcon}
              alt="search"
              className="w-[20px] h-[20px]"
            />
            <input
              type="text"
              placeholder="Search"
              className="p-1 outline-none w-full h-full"
            />
          </search>
        </div>

        {/* cards */}

        <container className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[30px]">
          {cardsData.map((items, index) => (
            <card
              key={index}
              className="bg-white p-3 rounded-[12px] shadow-md flex flex-col gap-[10px] border border-[#F1F1F1]"
            >
              <p className="text-[#A3A3A3] text-[14px]  font-medium">
                {items.title}
              </p>
              <p className="text-[#101828] font-semibold text-[24px]">
                {items.amount}
              </p>
              <div className="flex items-center text-[14px] gap-1 border-b border-b-[#F1F1F1] pb-[10px]">
                <img src={Icons.greenUpArrow} alt="rising" />
                <p className="text-[#027A48]">{items.interest}</p>
                <p className="text-[#667085]">vs last month</p>
              </div>

              <p className="self-end cursor-pointer text-[14px] font-medium text-[#1A1A1A]">
                View report
              </p>
            </card>
          ))}
        </container>

        {/* quick links */}

        <container className="mt-[30px]">
          <p className="text-[#1A1A1A] text-[20px] font-medium mb-[16px] mt-[30px]">
            Quick Links
          </p>
          <wrapper className="flex gap-[20px] flex-nowrap w-full quick-links overflow-x-scroll">
            {/* first card */}
            <card className="w-[317px] bg-[#F3F3F6] relative overflow-hidden rounded-[10px] py-[23px] flex-shrink-0 pl-[22px] pr-[31px]">
              <h3 className="text-[18px]  text-[#383268] font-medium mb-[5px]">
                Send Message
              </h3>
              <p className="text-[14px] text-[#605B86] font-normal">
                Quickly launch a new campaign in SMS, Email, WhatsApp, OTP.
                Start reaching your audience today!
              </p>

              <img
                src={Icons.vector}
                alt=""
                className="right-0 bottom-0 absolute"
              />
            </card>
            {/* second card */}
            <card className="w-[317px] bg-[#F6F3F5] relative overflow-hidden rounded-[10px] py-[23px] flex-shrink-0 pl-[22px] pr-[31px]">
              <h3 className="text-[18px]  text-[#692B56] font-medium mb-[5px]">
                Analytics
              </h3>
              <p className="text-[14px] text-[#875578] font-normal">
                Explore in-depth insights into your campaign performance and
                engagement metrics.
              </p> 

              <img
                src={Icons.vector}
                alt=""
                className="right-0 bottom-0 absolute "
              />
            </card>
            {/* third card */}
            <card className="w-[317px] bg-[#F9F1F3] relative overflow-hidden rounded-[10px] py-[23px] flex-shrink-0 pl-[22px] pr-[31px]">
              <h3 className="text-[18px]  text-[#9A2444] font-medium mb-[5px]">
                Wallet
              </h3>
              <p className="text-[14px] text-[#AE5069] font-normal">
                Manage your credits and top-up your balance to keep campaigns
                running smoothly.
              </p>

              <img
                src={Icons.vectorWallet}
                alt=""
                className="right-0 bottom-0 absolute "
              />
            </card>
            {/* forth card */}
            <card className="w-[317px]  bg-[#F1F5F8] relative overflow-hidden rounded-[10px] py-[23px] flex-shrink-0 pl-[22px] pr-[31px]">
              <h3 className="text-[18px]  text-[#3F637E] font-medium mb-[5px]">
                Template
              </h3>
              <p className="text-[14px] text-[#47708F] font-normal">
                Create and manage messages for a consistent campaign experience.
              </p>

              <img
                src={Icons.vector}
                alt=""
                className="right-0 bottom-0 absolute "
              />
            </card>
          </wrapper>
        </container>

        <div className="mt-[30px]">
          <MessageSentChart />
        </div>

        <div className="mt-[30px]">
          <RecentMessage />
        </div>

        <div className="mt-[30px]">
          <TopCompaniesChart />
        </div>

        <div className="mt-[30px] mb-[30px]">
          <NotificationAlert />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
