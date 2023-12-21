import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { fetchData, removeData } from "../services/apiService";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import StudentModal from "../components/Modal/StudentModal";
import { Dropdown } from "react-native-element-dropdown";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  pageHeader: {
    fontSize: 24,
    fontWeight: "700",
  },
  pageSubHeader: {
    color: "#64748B",
    fontWeight: "400",
    fontSize: 12,
  },
  pageHeaderActionBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FEAF00",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  studentsList: {
    flex: 1,
    padding: 16,
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  studentCard: {
    borderWidth: 1,
    borderColor: "#F1F5F9",
    borderRadius: 12,
    marginBottom: 16,
  },
  studentCardName: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
  },
  studentCardNameText: {
    fontWeight: "600",
    fontSize: 12,
    color: "#0F172A",
  },
  studentCardActionBtn: {
    flexDirection: "row",
    gap: 10,
  },
  studentCardBtn: {
    borderWidth: 1,
    borderColor: "#F1F5F9",
    padding: 8,
    borderRadius: 12,
  },
  studentDetail: {
    padding: 16,
    gap: 16,
  },
  studentDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  studentDetailRowLabel: {
    fontWeight: "500",
    fontSize: 12,
    color: "#64748B",
  },
  studentDetailRowValue: {
    fontWeight: "600",
    fontSize: 12,
    color: "#0F172A",
  },
  paginationButton: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    alignContent: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
  },
  paginationButtonText: { color: "#94A3B8", textAlign: "center" },
  activeButton: { color: "#FEAF00" },
  item: {
    padding: 20,
    marginTop: 5,
    fontSize: 15,
    backgroundColor: "white",
    flexDirection: "row",
  },
});

export default function StudentsScreen() {
  const [value, setValue] = useState("10");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [endIndex, setEndIndex] = useState(itemsPerPage);
  const [currentPageData, setCurrentPageData] = useState();

  const dropdownValues = Array.from({ length: 10 }, (_, index) => ({
    label: `${index + 1} items`,
    value: `${index + 1}`,
  }));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    opened: false,
    new: null,
    item: null,
  });

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  useEffect(() => {
    if (data) {
      setTotalpages(Math.ceil(data.length / itemsPerPage));
    }
  }, [data, itemsPerPage]);

  useEffect(() => {
    // Calculate starting and ending indexes for the current page
    if (data) {
      const newStartIndex = (currentPage - 1) * itemsPerPage;
      const newEndIndex = newStartIndex + itemsPerPage;

      // Slice the articleData array to get the items for the current page
      const newCurrentPageData = data.slice(newStartIndex, newEndIndex);

      setEndIndex(newEndIndex);
      setCurrentPageData(newCurrentPageData);
    }
  }, [currentPage, data, itemsPerPage]);

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
        <Text style={styles.item}>No data found</Text>
      </View>
    );
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const pagination = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Pressable
          key={i}
          style={[styles.paginationButton]}
          onPress={() => setCurrentPage(i)}
        >
          <Text
            style={[
              styles.paginationButtonText,
              i === currentPage && styles.activeButton,
            ]}
          >
            {i}
          </Text>
        </Pressable>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.pageHeader}>Students List</Text>
        <Text style={styles.pageSubHeader}>
          Detailed information about your students
        </Text>
      </View>
      <View style={styles.pageHeaderActionBtn}>
        <Pressable
          style={styles.button}
          onPress={() => {
            setModal({ opened: true, new: true, item: null });
          }}
        >
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Text style={styles.buttonText}>+</Text>
            <Text style={styles.buttonText}>Add New Student</Text>
          </View>
        </Pressable>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View
            style={{ backgroundColor: "white", padding: 12, borderRadius: 12 }}
          >
            <AntDesign name="bars" size={24} color="#FEAF00" />
          </View>
          <View
            style={{ backgroundColor: "white", padding: 12, borderRadius: 12 }}
          >
            <AntDesign name="appstore-o" size={24} color="#94A3B8" />
          </View>
        </View>
      </View>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator color="#feaf00" />
        </View>
      ) : (
        <View style={styles.studentsList}>
          <FlatList
            style={{}}
            data={currentPageData}
            renderItem={({ item }) => (
              <View key={item.key} style={styles.studentCard}>
                <View style={styles.studentCardName}>
                  <Text style={styles.studentCardNameText}>{item.name}</Text>
                  <View style={styles.studentCardActionBtn}>
                    <Pressable
                      style={styles.studentCardBtn}
                      onPress={() => {
                        setModal({ opened: true, new: false, item: item });
                      }}
                    >
                      <Image
                        source={require("../../assets/pen.svg")}
                        style={{ height: 18, width: 18 }}
                      />
                    </Pressable>
                    <Pressable
                      style={styles.studentCardBtn}
                      onPress={() => {
                        handleDelete(item.key);
                      }}
                    >
                      <Image
                        source={require("../../assets/trash.svg")}
                        style={{ height: 20, width: 18 }}
                      />
                    </Pressable>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: "#F1F5F9",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                <View style={styles.studentDetail}>
                  <View style={styles.studentDetailRow}>
                    <Text style={styles.studentDetailRowLabel}>Age</Text>
                    <Text style={styles.studentDetailRowValue}>{item.age}</Text>
                  </View>
                  <View style={styles.studentDetailRow}>
                    <Text style={styles.studentDetailRowLabel}>Hometown</Text>
                    <Text style={styles.studentDetailRowValue}>
                      {item.hometown}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.key}
            ListEmptyComponent={myListEmpty}
          />

          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginVertical: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "600", fontSize: 14, color: "#0F172A" }}
                >
                  Show rows:
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                }}
              >
                <Dropdown
                  style={{
                    borderWidth: 1,
                    borderColor: "#E2E8F0",
                    borderRadius: 12,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                  }}
                  itemTextStyle={{
                    color: "#94A3B8",
                    fontWeight: "500",
                    fontSize: 14,
                  }}
                  selectedTextStyle={{
                    color: "#94A3B8",
                    fontWeight: "500",
                    fontSize: 14,
                    flex: 1,
                  }}
                  dropdownPosition="top"
                  inverted={false}
                  iconColor={"#94A3B8"}
                  data={dropdownValues}
                  labelField="label"
                  valueField="value"
                  value={value}
                  onChange={(item) => {
                    setValue(item.value);
                    setItemsPerPage(+item.value);
                    setCurrentPage(1);
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              gap: 20,
            }}
          >
            <Pressable
              onPress={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={styles.paginationButton}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={currentPage === 1 ? "#94A3B8" : "#64748B"}
                style={{ textAlign: "center" }}
              />
            </Pressable>
            {/* {renderPaginationButtons()} */}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Pressable
                style={[styles.paginationButton]}
                onPress={() => setCurrentPage(1)}
              >
                <Text
                  style={[
                    styles.paginationButtonText,
                    1 === currentPage && styles.activeButton,
                  ]}
                >
                  1
                </Text>
              </Pressable>
              <View style={styles.paginationButton}>
                <Text style={{ textAlign: "center" }}>...</Text>
              </View>
              <Pressable
                style={[styles.paginationButton]}
                onPress={() => setCurrentPage(10)}
              >
                <Text
                  style={[
                    styles.paginationButtonText,
                    10 === currentPage && styles.activeButton,
                  ]}
                >
                  10
                </Text>
              </Pressable>
            </View>
            <Pressable
              onPress={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={styles.paginationButton}
            >
              <Ionicons
                name="chevron-forward"
                size={24}
                color={currentPage === totalPages ? "#94A3B8" : "#64748B"}
                style={{ textAlign: "center" }}
              />
            </Pressable>
          </View>
        </View>
      )}

      <StudentModal
        modal={modal}
        handleModal={(data) => {
          setModal({ opened: data.opened, new: data.new, item: null });
        }}
        handleEditStudent={(data) => {
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
        }}
        handleAddStudent={(result) => {
          setData([...data, result]);
        }}
      ></StudentModal>
    </View>
  );
}
