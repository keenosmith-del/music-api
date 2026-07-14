import AppLayout from "../../components/layout/AppLayout";
import Sidebar from "../../components/layout/Sidebar";
import FloatingPlayer from "../../components/layout/FloatingPlayer";

export default function Home() {
    return (
        <AppLayout
            sidebar={<Sidebar />}
            player={<FloatingPlayer />}
        >
        </AppLayout>
    );
}