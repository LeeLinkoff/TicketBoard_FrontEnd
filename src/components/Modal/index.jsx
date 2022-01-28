import './style.scss'

const Modal = ({on, toggle, children, slim}) => {

    return (
        <div className={`modal${on ? ' on' : ''}`}>
            <div className="scrim" onClick={toggle}></div>
            <div className={`modal-card${slim ? ' slim':''}`}>
                {children}
            </div>
        </div>
    )
}

export default Modal