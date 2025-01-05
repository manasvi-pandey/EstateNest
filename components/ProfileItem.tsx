import icons from "@/constants/icons";
import {
    Image,
    ImageSourcePropType,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
    title: string;
    icon: ImageSourcePropType;
    titleStyle?: string;
    onPress?: () => void;
    showArrow?: boolean;
}

const ProfileItem = ({
    title,
    icon,
    titleStyle,
    onPress,
    showArrow = true,
}: Props) => {
    return (
        <TouchableOpacity
            className="flex-row items-center justify-between"
            onPress={onPress}
        >
            <View className="flex-row items-center justify-between gap-3">
                <Image source={icon} className="size-6" />
                <Text className={`font-roboto-medium text-lg ${titleStyle}`}>
                    {title}
                </Text>
            </View>
            {showArrow && (
                <Image source={icons.rightArrow} className="size-6" />
            )}
        </TouchableOpacity>
    );
};

export default ProfileItem;
