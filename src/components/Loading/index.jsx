import './style.scss'
import Modal from '../Modal'
import loadingSvg from '../../images/loading.svg'

const Loading = ({on, toggle}) => {

    return (
        <Modal on={on} toggle={toggle}>
            <div className="loading">
                <img src={loadingSvg} alt="Loading..." />
            </div>
        </Modal>
    )
}

export default Loading