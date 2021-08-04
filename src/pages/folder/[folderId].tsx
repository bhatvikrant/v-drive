import { useLayoutEffect } from "react";
import { useRouter } from "next/router";

// COMPONENTS
import FoldersDisplay from "@/components/FoldersDisplay";

// CONTEXT
import { useAuth } from "@/contexts/AuthContext";

// TS INTERFACES
interface Props { }

const DynamicFolder: React.FC<Props> = props => {
    const { } = props;

    const router = useRouter();
    const { currentUser } = useAuth();

    useLayoutEffect(() => {
        if (!currentUser) {
            router.push("/");
        }
    }, [currentUser, router]);

    return (
        <FoldersDisplay folderId={router.query.folderId as string} />
    );
};

export default DynamicFolder;
