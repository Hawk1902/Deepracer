import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import config from "../config/env";

function RewardImage() {
  const modelName = useSelector((state) => state.app.modelName);  
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(modelName.length > 0 ? `${config.external_ip_addr}/generated/reward-` + modelName + ".png" : "");
  }, [modelName])

  return (
    <div>
        {
        url === "" ? 
        <div style={{ "textAlign": "center", "marginTop": "5em" }}>Please select a model to render Reward graph</div>
        : <img alt="reward graph" src={url} />
        }
    </div>
  )
}

export default RewardImage