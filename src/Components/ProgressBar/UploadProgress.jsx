import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const UploadProgress = ({ progress, error }) => {
  return (
    <div className="w-[100px] h-[100px]">
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          pathColor: error ? "orange" : "#40BB69", // Change color to yellow-orange on error
          textColor: "#000",
          trailColor: "#ddd",
          strokeLinecap: "round",
        })}
      />
    </div>
  );
};

export default UploadProgress;
