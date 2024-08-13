import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";

const Home = () => {
    const loggedIn = { firstName: "Andereyan", lastName: "Muhammat", email: "andereyan@gmail.com" };
    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="Access and manage your account and transaction efficiently"
                    />
                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1000.43}
                    />
                </header>
                Recent Transaction
            </div>
            <RightSidebar
                user={loggedIn}
                transactions={[]}
                banks={[{}, {}]}
            />
        </section>
    );
};

export default Home;
