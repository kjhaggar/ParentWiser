import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import {
  addData,
  fetchData,
  removeData,
  updateData,
} from "../services/apiService";
import { Controller, useForm } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
  stickyHeader: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "700",
    fontSize: 22,
  },
  button: {
    backgroundColor: "#FEAF00",
    paddingVertical: 15,
    paddingHorizontal: 27,
    borderRadius: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  studentsTable: {},
  studentsTableHeader: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 20,
  },
  studentsTableHeaderCell: { flex: 1, alignItems: "center" },
  studentsTableHeaderCellText: {
    color: "#ACACAC",
    fontWeight: "600",
    fontSize: 12,
  },
  studentsTableRow: {
    padding: 24,
    marginTop: 5,
    fontSize: 15,
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 8,
  },
  studentsTableRowItem: { flex: 1, alignItems: "center" },
  studentsTableRowItemActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
  },
  studentsTableRowItemText: {
    fontWeight: "400",
    fontSize: 14,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    width: 300, // Adjust the width as needed
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

export default function StudentsScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    opened: false,
    new: null,
  });

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
    fetchDataFromApi();
  }, []);

  const fetchDataFromApi = async () => {
    try {
      const result = await fetchData();
      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Handle error or show an error message to the user
    }
  };

  const handleEdit = async (data) => {
    try {
      const result = await updateData(data);
      setModal({ opened: false, new: null });
      setData((prevItems) =>
        prevItems.map((item) => {
          if (item.key === data.key) {
            // If the item has the matching ID, update its properties
            return { ...item, ...data };
          }
          // If the item does not have the matching ID, return it unchanged
          return item;
        })
      );
    } catch (error) {
      // Handle error or show an error message to the user
    }
  };

  const handleAdd = async (newData) => {
    try {
      const result = await addData(newData);
      setData([...data, result]);
      setModal({ opened: false, new: null });
    } catch (error) {
      // Handle error or show an error message to the user
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await removeData(id);
      const updatedData = data.filter((item) => item.key !== id);
      setData(updatedData);
    } catch (error) {
      // Handle error or show an error message to the user
    }
  };

  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.studentsTableRow}>No data found</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.stickyHeader}>
        <Pressable>
          <Image
            source={require("../../assets/caretCircleRight.svg")}
            style={{ width: 18, height: 18 }}
          />
        </Pressable>

        <Pressable>
          <Image
            source={require("../../assets/bell_1.svg")}
            style={{ width: 17, height: 20 }}
          />
        </Pressable>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Students List</Text>
          <Pressable
            style={styles.button}
            onPress={() => {
              reset();
              setModal({ opened: true, new: true });
            }}
          >
            <Text style={styles.buttonText}>{"ADD NEW STUDENT"}</Text>
          </Pressable>
        </View>
        <View
          style={{
            borderBottomColor: "#E5E5E5",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        {loading ? (
          <View style={[styles.container]}>
            <ActivityIndicator color="#feaf00" />
          </View>
        ) : (
          <ScrollView showsHorizontalScrollIndicator={false}>
            <FlatList
              style={{}}
              data={data}
              renderItem={({ item }) => (
                <View key={item.key} style={styles.studentsTableRow}>
                  <View style={styles.studentsTableRowItem}>
                    <Text style={styles.studentsTableRowItemText}>
                      {item.name}
                    </Text>
                  </View>
                  <View style={styles.studentsTableRowItem}>
                    <Text style={styles.studentsTableRowItemText}>
                      {item.age}
                    </Text>
                  </View>
                  <View style={styles.studentsTableRowItem}>
                    <Text style={styles.studentsTableRowItemText}>
                      {item.hometown}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.studentsTableRowItem,
                      styles.studentsTableRowItemActions,
                    ]}
                  >
                    <Pressable
                      onPress={() => {
                        Object.entries(item).forEach(([field, value]) => {
                          setValue(field, value);
                          trigger(field); // Trigger validation for each field
                        });
                        setModal({ opened: true, new: false });
                      }}
                    >
                      <Image
                        source={require("../../assets/pen_1.svg")}
                        style={{ width: 19, height: 19 }}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        handleDelete(item.key);
                      }}
                    >
                      <Image
                        source={require("../../assets/trash_1.svg")}
                        style={{ width: 16, height: 18 }}
                      />
                    </Pressable>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.key}
              ListEmptyComponent={myListEmpty}
              ListHeaderComponent={() => (
                <View style={styles.studentsTableHeader}>
                  <View style={styles.studentsTableHeaderCell}>
                    <Text style={styles.studentsTableHeaderCellText}>Name</Text>
                  </View>
                  <View style={styles.studentsTableHeaderCell}>
                    <Text style={styles.studentsTableHeaderCellText}>Age</Text>
                  </View>
                  <View style={styles.studentsTableHeaderCell}>
                    <Text style={styles.studentsTableHeaderCellText}>
                      Hometown
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}></View>
                </View>
              )}
            />
          </ScrollView>
        )}
      </View>

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
              <Text style={styles.errorText}>
                {errors.age.message as string}
              </Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Hometown"
                  value={value}
                  onChangeText={(value) => onChange(value)}
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
                setModal({ opened: false, new: null });
              }}
              style={{ position: "absolute", right: 0, top: 0, padding: 5 }}
            >
              <FontAwesome name="close" size={16} color="black" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
