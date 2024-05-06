const Spinner = () => {
    return (
        <div className="">
            <div className="loadingSpinnerContainer overflow-hidden disable-scroll">
                <div className="wrapperLoader">
                    <div className="circleLoader"></div>
                    <div className="circleLoader"></div>
                    <div className="circleLoader"></div>
                    <div className="shadowLoader"></div>
                    <div className="shadowLoader"></div>
                    <div className="shadowLoader"></div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;
