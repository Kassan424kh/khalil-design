import "./styles.sass";

const Start = () => {
  return (
    <div className={"start-page"}>
      <GroovSvg />[ Khalil Design ]
    </div>
  );
};

const GroovSvg = () => (
  <svg
    className={"paper-effect"}
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
  >
    <defs>
      <filter id="goovey">
        <feTurbulence
          type="fractalNoise"
          baseFrequency=".005"
          seed="10"
          result="warpper"
        ></feTurbulence>
        <feDisplacementMap
          xChannelSelector="R"
          yChannelSelector="G"
          scale="70"
          in="SourceGraphic"
        ></feDisplacementMap>
      </filter>
    </defs>
    <defs>
      <filter id="gooveyCooling">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0"
          seed="1"
          result="warpper"
        ></feTurbulence>
        <feDisplacementMap
          xChannelSelector="R"
          yChannelSelector="G"
          scale="70"
          in="SourceGraphic"
        ></feDisplacementMap>
      </filter>
    </defs>
    <defs>
      <filter
        width="2560"
        height="1440"
        x="0"
        y="0"
        id="blur1"
        filterUnits="userSpaceOnUse"
      >
        <feGaussianBlur stdDeviation="0 0"></feGaussianBlur>
      </filter>
    </defs>
  </svg>
);

export default Start;
