import { ContextAPI } from "@/utils/contextAPI/latchContextAPI";
import Link from "next/link";
import { useContext } from "react";
import RoadmapBox from "./roadmapBox";
import { BiRocket } from "react-icons/bi";
import { BiPlanet } from "react-icons/bi";
import { GiFocusedLightning } from "react-icons/gi";
import { ImFire } from "react-icons/im";
import { LuCrown } from "react-icons/lu";
import { LiaAtomSolid } from "react-icons/lia";

export default function Roadmap() {
  const { sectionRefs, animationOnBySection } = useContext(ContextAPI);
  return (
    <section
      ref={(el) => (sectionRefs.current.roadmap = el)}
      className={`w-[96%] mx-auto flex flex-col justify-center items-center  ${
        animationOnBySection?.roadmap ? "" : "invisible"
      }`}
    >
      <div
        className={`flex flex-col justify-start items-center text-left gap-3 `}
      >
        <p
          className={`w-full subTitle  ${
            animationOnBySection?.roadmap ? "toBottom" : ""
          }`}
        >
          ROADMAP
        </p>
        <p
          className={`break-word ${
            animationOnBySection?.roadmap ? "toLeft" : ""
          }`}
        >
          Our creative team is building an exciting metaverse gaming platform
          where users can have fun, own, and monetize rewards. We aim to expand
          our decentralized ecosystem and share it with more players.
        </p>

        {/* XL */}
        <div className="w-full xl:flex flex-col gap-3 hidden">
          <div className="w-full grid grid-cols-3 justify-center items-start gap-3 toBottom">
            <RoadmapBox
              Icon={BiRocket}
              title="Step 1"
              textList={["Submission for Core Hackathon"]}
              animation="toTop"
            />
            <RoadmapBox
              Icon={BiPlanet}
              title="Step 2"
              textList={["Launch CoreVerse Battleground website", "Launch BattleCoin SNS"]}
              animation="toBottom"
            />
            <RoadmapBox
              Icon={GiFocusedLightning}
              title="Step 3"
              textList={[
                "Deploy $BattleCoin token and NFT Items",
                "Deploy essential contracts",
                "Launch CoreVerse Battleground game beta",
              ]}
              animation="toTop"
            />
          </div>
          <div className="w-full grid grid-cols-3 justify-center items-start gap-3 toTop">
            <RoadmapBox
              Icon={ImFire}
              title="Step 4"
              textList={[
                "Introduce CoreVerse market",
                "Open CoreVerse market",
                "Host events for users",
              ]}
              animation="toBottom"
            />
            <RoadmapBox
              Icon={LuCrown}
              title="Step 5"
              textList={["Introduce a raid system", "implement a raid system"]}
              animation="toTop"
            />
            <RoadmapBox
              Icon={LiaAtomSolid}
              title="Step 6"
              textList={["More to come..."]}
              animation="toBottom"
            />
          </div>
        </div>

        {/* MD */}
        <div className="w-full md:flex flex-col gap-3 hidden xl:hidden">
          <div className="w-full grid grid-cols-2 justify-center items-start gap-3">
            <RoadmapBox
              Icon={BiRocket}
              title="Step 1"
              textList={["Submission for Core Hackathon"]}
              animation="toRight"
            />
            <RoadmapBox
              Icon={BiPlanet}
              title="Step 2"
              textList={["Launch CoreVerse Battleground website", "Launch BattleCoin SNS"]}
              animation="toLeft"
            />
            <RoadmapBox
              Icon={GiFocusedLightning}
              title="Step 3"
              textList={[
                "Deploy $BattleCoin token and NFT Items",
                "Deploy essential contracts",
                "Launch CoreVerse Battleground game beta",
              ]}
              animation="toLeft"
            />
            <RoadmapBox
              Icon={ImFire}
              title="Step 4"
              textList={[
                "Introduce BattleCoin market",
                "Open BattleCoin market",
                "Host events for users",
              ]}
              animation="toRight"
            />

            <RoadmapBox
              Icon={LuCrown}
              title="Step 5"
              textList={["Introduce a raid system", "implement a raid system"]}
              animation="toRight"
            />
            <RoadmapBox
              Icon={LiaAtomSolid}
              title="Step 6"
              textList={["More to come..."]}
              animation="toLeft"
            />
          </div>
        </div>

        {/* SM */}
        <div className="w-full flex flex-col gap-3 md:hidden ">
          <RoadmapBox
            Icon={BiRocket}
            title="Step 1"
            textList={["Submission for Core Hackathon"]}
            animation="popUp"
          />
          <RoadmapBox
            Icon={BiPlanet}
            title="Step 2"
            textList={["Launch CoreVerse Battleground website", "Launch BattleCoin SNS"]}
            animation="popUp"
          />
          <RoadmapBox
            Icon={GiFocusedLightning}
            title="Step 3"
            textList={[
              "Deploy $BattleCoin token and NFT Items",
              "Deploy essential contracts",
              "Launch BattleCoin game beta",
            ]}
            animation="popUp"
          />
          <RoadmapBox
            Icon={ImFire}
            title="Step 4"
            textList={[
              "Introduce BattleCoin market",
              "Open BattleCoin market",
              "Host events for users",
            ]}
            animation="popUp"
          />
          <RoadmapBox
            Icon={LuCrown}
            title="Step 5"
            textList={["Deploy Amon"]}
            animation="popUp"
          />
          <RoadmapBox
            Icon={LiaAtomSolid}
            title="Step 6"
            textList={["More to come..."]}
            animation="popUp"
          />
        </div>
      </div>
    </section>
  );
}
