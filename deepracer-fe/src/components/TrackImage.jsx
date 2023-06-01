import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function TrackImage() {
  const modelName = useSelector((state) => state.app.modelName);  
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(modelName.length > 0 ? "http://localhost:4000/generated/track-" + modelName + ".png" : "");
  }, [modelName])

  return (
    <div>
        {
        url === "" ? 
        <div style={{ "textAlign": "center", "marginTop": "5em" }}>Please select a model to render Track graph</div>
        : <img alt="track graph" src={url} />
        }
    </div>
  )
}

export default TrackImage