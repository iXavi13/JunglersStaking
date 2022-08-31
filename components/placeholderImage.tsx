import { motion } from "framer-motion";
import { FC } from "react";
import { idList } from '../constants/imageList';

export const JunglersImage: FC<{Id: any}> = (props) => (
    <motion.div whileHover={{scale: 1.05}} className="junglers-container">
        <img src={`https://d3ujpwzi55x5a1.cloudfront.net/${idList[props.Id]}`} className="rounded-t"/>
        <div className="junglers-container-subtitle">
            Jungler #{props.Id}
        </div>
    </motion.div>
)