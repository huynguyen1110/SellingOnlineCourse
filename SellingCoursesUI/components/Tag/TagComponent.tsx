import {
    View,
    Touchable,
    Text,
    TouchableOpacity
} from "react-native"

import { tagStyles } from "./TagComponentStyle";

const TagComponent = (props: any) => {

    return (
        <TouchableOpacity onPress={() => props.handelHelper(props.content)} style={tagStyles.borderTag}>
            <Text style={tagStyles.contentTag}>{props.content}</Text>
        </TouchableOpacity>
    )
}

export default TagComponent