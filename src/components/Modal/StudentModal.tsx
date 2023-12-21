import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { addData, updateData } from "../../services/apiService";
import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    width: 300,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#feaf00",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },

  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});
const StudentModal = ({ modal, handleModal, handleEditStudent, handleAddStudent }) => {
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (modal.new) {
      handleAdd(data);
    } else {
      handleEdit(data);
    }
  };

  useEffect(() => {
    if (!modal.new) {
      if (modal.item) {
        Object.entries(modal.item).forEach(([field, value]) => {
          setValue(field, value.toString());
          trigger(field); // Trigger validation for each field
        });
      }
    } else if (modal.new) {
      setValue("name", "");
      setValue("age", "");
      setValue("hometown", "");
    }
  }, [modal]);

  const handleEdit = async (data) => {
    try {
      const result = await updateData(data);
      handleModal({ opened: false, new: null });
      handleEditStudent(data)
     
    } catch (error) {
      // Handle error or show an error message to the user
    }
  };

  const handleAdd = async (newData) => {
    try {
      const result = await addData(newData);
      handleModal({ opened: false, new: null });
      handleAddStudent(result)
    } catch (error) {
      // Handle error or show an error message to the user
    }
  };

  return (
    <Modal animationType="fade" transparent visible={modal.opened}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={value}
                defaultValue=""
                onChangeText={(value) => onChange(value)}
              />
            )}
            name="name"
            rules={{ required: "This field is required" }}
          />
          {errors.name && (
            <Text style={styles.errorText}>
              {errors.name.message as string}
            </Text>
          )}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Age"
                value={value}
                onChangeText={(value) => onChange(value)}
                keyboardType="numeric"
                defaultValue=""
              />
            )}
            name="age"
            rules={{
              required: "This field is required",
              pattern: {
                value: /^[0-9]*$/,
                message: "Invalid age format",
              },
            }}
          />
          {errors.age && (
            <Text style={styles.errorText}>{errors.age.message as string}</Text>
          )}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Hometown"
                value={value}
                onChangeText={(value) => onChange(value)}
                defaultValue=""
              />
            )}
            name="hometown"
            rules={{ required: "This field is required" }}
          />
          {errors.hometown && (
            <Text style={styles.errorText}>
              {errors.hometown.message as string}
            </Text>
          )}

          <Pressable
            onPress={handleSubmit(onSubmit)}
            style={styles.submitButton}
          >
            <Text style={styles.modalButtonText}>Submit</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleModal({ opened: false, new: null });
            }}
            style={{ position: "absolute", right: 0, top: 0, padding: 5 }}
          >
            <FontAwesome name="close" size={16} color="black" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default StudentModal;
