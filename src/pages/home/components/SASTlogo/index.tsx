import sastlogo from '../../../../assets/sastlogo.png'
import './index.scss'

const Footer = () => {
    return (
        <div className='globalfooter'>
            <img className='sastlogo' src={sastlogo} alt='sastlogo'></img>
            <div className='info'>通用比赛管理评审系统 version 2.1</div>
            <div className='info'>{`1992 - 2024 Students' Association for Science and Technology · `}<a href='https://github.com/NJUPT-SAST' aria-label='sast github'>Github</a></div>
        </div>
    )
}

export default Footer