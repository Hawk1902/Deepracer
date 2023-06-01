import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function CrashImage() {
  const modelName = useSelector((state) => state.app.modelName);  
  const [url, setUrl] = useState("");

  useEffect(() => {
    console.log("model name updated: ", modelName);
    setUrl(modelName.length > 0 ? "http://localhost:4000/generated/crash-" + modelName + ".png" : "");
  }, [modelName])

  return (
    <div>
        {
        url === "" ? 
        <div style={{ "textAlign": "center", "marginTop": "5em" }}>Please select a model to render Crash graph</div>
        : <img alt="crash graph" src={url} />
        }
    </div>
  )
}

export default CrashImage