"use client";

import { RefObject, useEffect } from "react";
import Script from "next/script";

interface BuilderTrendEmbedProps {
  iframeRef?: RefObject<HTMLIFrameElement | null>;
}

export const BuilderTrendEmbed = ({ iframeRef }: BuilderTrendEmbedProps) => {
  useEffect(() => {
    // BuilderTrend message listener for dynamic iframe height
    const receiveMessage = (event: MessageEvent) => {
      const iframe = document.getElementById("btIframe") as HTMLIFrameElement;
      
      if (iframe) {
        let frameHeight = null;

        if (event.data?.FrameHeight) {
          frameHeight = event.data.FrameHeight + "px";
        } else if (event.data?.height) {
          frameHeight = event.data.height + "px";
        } else if (typeof event.data === "string" && event.data.indexOf("h=") >= 0) {
          frameHeight = event.data.replace("h=", "") + "px";
        }

        if (frameHeight) {
          iframe.style.height = frameHeight;
        }
      }
    };

    window.addEventListener("message", receiveMessage, false);

    return () => {
      window.removeEventListener("message", receiveMessage, false);
    };
  }, []);

  return (
    <div className="w-full bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
        Contact Form
      </h3>
      <div className="w-full overflow-hidden rounded-lg border border-gray-300">
        {/* BuilderTrend Script */}
        <Script
          src="https://buildertrend.net/leads/contactforms/js/btClientContactForm.js"
          strategy="lazyOnload"
        />
        
        {/* BuilderTrend Iframe */}
        <iframe
          ref={iframeRef}
          id="btIframe"
          src="https://buildertrend.net/leads/contactforms/ContactFormFrame.aspx?builderID=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidWlsZGVySWQiOjYxNzI1fQ.2b-qQpNHXdw4r7_31Hsno4r7mpK1_5LIDhB3__sOsEE"
          scrolling="no"
          style={{
            background: "transparent",
            border: "0px",
            margin: "0 auto",
            width: "100%",
            minHeight: "600px",
          }}
          title="BuilderTrend Contact Form"
          className="w-full"
        />
      </div>
    </div>
  );
};
