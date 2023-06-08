import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import config from "../config/env";

function TrajectoryImage() {
  const modelName = useSelector((state) => state.app.modelName);  
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(modelName.length > 0 ? `${config.external_ip_addr}/generated/trajectory-` + modelName + ".png" : "");
  }, [modelName])

  return (
    <div>
        {
        url === "" ? 
        <div style={{ "textAlign": "center", "marginTop": "5em" }}>Please select a model to render Trajectory graph</div>
        : <img alt="trajectory graph" src={url} />
        }
    </div>
  )
}

export default TrajectoryImage