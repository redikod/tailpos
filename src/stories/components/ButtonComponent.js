import * as React from "react";
import { View, Button, Text } from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";

const ButtonComponent = props =>
  props.status === "add" ? (
    <View
      style={{
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        height: 60,
        justifyContent: "flex-end",
        marginTop: 20,
      }}
    >
      <Button
        style={{ alignSelf: "flex-end", marginBottom: 10, marginRight: 20 }}
        onPress={props.onCancel}
      >
        <Icon name="ban" color="white" size={21} style={{ marginLeft: 10 }} />
        <Text>Cancel </Text>
      </Button>

      <Button
        style={{ alignSelf: "flex-end", marginBottom: 10 }}
        onPress={props.onAdd}
      >
        <Icon name="plus" color="white" size={21} style={{ marginLeft: 10 }} />
        <Text>Save new {props.text}</Text>
      </Button>
    </View>
  ) : (
    <View
      style={{
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        height: 60,
        justifyContent: "flex-end",
        marginTop: 20,
      }}
    >
      <Button
        style={{ alignSelf: "flex-end", marginBottom: 10, marginRight: 20 }}
        onPress={props.onCancel}
      >
        <Icon name="ban" color="white" size={21} style={{ marginLeft: 10 }} />
        <Text>Cancel </Text>
      </Button>

      <Button
        style={{ alignSelf: "flex-end", marginBottom: 10 }}
        onPress={props.onEdit}
      >
        <Icon
          name="pencil"
          color="white"
          size={21}
          style={{ marginLeft: 10 }}
        />
        <Text>Edit {props.text}</Text>
      </Button>
    </View>
  );

export default ButtonComponent;
