import Card from "../card/Card";

const Widget = ({ icon, title, subtitle }) => {
    return (
        <Card extra="flex items-center justify-between rounded-[20px] w-full">
            <div className="flex items-center">
                <div className="rounded-full bg-[#0c53a21c] p-3">
                    <span className="flex items-center text-[#0c53a2] text-xl">
                        {icon}
                    </span>
                </div>
                <div className="ml-4">
                    <p className="text-[#0c53a247] font-medium text-2xl	">{title}</p>
                    <h4 className="text-[#00234b] font-bold text-xl">{subtitle}</h4>
                </div>
            </div>
        </Card>
    );
};

export default Widget;