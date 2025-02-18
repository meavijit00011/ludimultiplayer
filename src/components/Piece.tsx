import { MdStars } from "react-icons/md";
import './Piece.css';
const Piece = ({ size, color, style ,rotate}: { size: number, color: string, style: {} ,rotate:boolean}) => {
    const classList = rotate? 'animate_rotate' : '';
    return (
        <div className={classList} style={style}>{<MdStars size={size} color={color} />}</div>
    )
}

export default Piece