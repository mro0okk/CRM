import style from "./Record.module.less"
import { SoundWave, SoundWaveFill } from "../../assets/svgs"
function WaveForm({ percent }) {
    return (<>
        <div style={{ position: "relative" }}>
            <SoundWave />
        </div>
        <audio src="" aria-disabled></audio>
        <div className={style.waveVol} style={{ width: percent }}>
            <SoundWaveFill />
        </div>
    </>)
}

export default WaveForm