import Button from "../../Components/buttons/transparentButton";
import TopCampaignsTable from "./TopCampaignsTable";
import MessageTypeChart from "./MessageTypeChart";
import DeliveryRateChart from "./DeliveryRateChart";
import ResponseTrendsChart from "./ResponseTrendsChart";
import EngagementMetricsChart from "./EngagementMetricsChart";

const Analytics = () => {
  return (
    <div className="sm:px-[31px] py-[32px] px-[10px]">
      <div className="flex justify-between align-center max-sm:flex-col gap-[20px]">
        <header className="max-w-[75%]">
          <h1 className="text-[#1A1A1A] text-[24px] font-medium">
            Campaign Performance Analytics
          </h1>
          <p className="text-[#767676] font-normal text-[15px]">
            Track essential metrics and monitor campaign success in real time.
          </p>
        </header>
        <div>
          <Button
            label="Export Summary"
            className="bg-[#383268] text-white rounded-[8px] w-[200px] add-group py-2 px-[18px] hover:bg-[#41397c]"
          />
        </div>
      </div>

      <div className="mt-[44px]">
        <MessageTypeChart />
      </div>
      <div className="mt-[44px]">
        <DeliveryRateChart />
      </div>

      <div className="mt-[44px]">
        <EngagementMetricsChart />
      </div>
      <div className="mt-[44px]">
        <ResponseTrendsChart />
      </div>
      <div className="mt-[44px]">
        <TopCampaignsTable />
      </div>
    </div>
  );
};

export default Analytics;
