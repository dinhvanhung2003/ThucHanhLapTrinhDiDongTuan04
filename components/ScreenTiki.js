import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Modal,
  Button,
  Dimensions,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const OrderScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 141800;
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);

  const discountCoupons = [
    { id: '1', code: 'GIAM10', discountPercent: 10 },
    { id: '2', code: 'GIAM20', discountPercent: 20 },
    { id: '3', code: 'GIAM30', discountPercent: 30 },
  ];

  const totalPrice = quantity * pricePerItem;
  const finalPrice = totalPrice - discountValue;

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const applyDiscount = () => {
    const foundCoupon = discountCoupons.find(
      (coupon) => coupon.code === discountCode
    );
    if (foundCoupon) {
      setAppliedDiscount(foundCoupon);
      const discount = (foundCoupon.discountPercent / 100) * totalPrice;
      setDiscountValue(discount);
    } else {
      alert('Mã giảm giá không hợp lệ');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sideTop}>
        <View style={styles.row}>
          <View style={styles.infoContainer}>
            <View>
              <Image source={require('../assets/book.png')} />
            </View>
            <View>
              <Text style={styles.title}>Nguyên hàm tích phân và ứng dụng</Text>
              <Text style={styles.supplier}>Cung cấp bởi Tiki Trading</Text>
              <Text style={styles.price}>
                {pricePerItem.toLocaleString()} đ
              </Text>
              <Text style={styles.priceDiscount}>
                {pricePerItem.toLocaleString()} đ
              </Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={decreaseQuantity}
                  style={styles.button}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity
                  onPress={increaseQuantity}
                  style={styles.button}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.couponSection}>
          <Text style={{ fontWeight: 'bold', fontSize: 13 }}>
            Mã giảm giá đã lưu{' '}
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.viewCouponText}>Xem tại đây</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.applyDiscountContainer}>
          <TextInput
            style={styles.discountInput}
            placeholder="Mã giảm giá"
            value={discountCode}
            onChangeText={setDiscountCode}
          />
          <TouchableOpacity style={styles.applyButton} onPress={applyDiscount}>
            <Text style={styles.applyButtonText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Danh sách mã giảm giá</Text>
              <FlatList
                data={discountCoupons}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.couponItem}>
                    <Text>
                      {item.code} - Giảm {item.discountPercent}%
                    </Text>
                  </View>
                )}
              />
              <Button title="Đóng" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.sideBottom}>
        <View style={styles.giftContainer}>
          <Text style={styles.giftLabel}>
            Bạn có phiếu quà tặng Tiki/Got it/urbox?
          </Text>
          <Text style={styles.giftInput}>Nhập tại đây?</Text>
        </View>
        <View style={styles.teamporaryContainer}>
          <Text style={styles.totalLabel}>Tạm tính:</Text>
          <Text style={styles.totalPrice}>{totalPrice.toLocaleString()} đ</Text>
        </View>

        {appliedDiscount && (
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>
              Giảm giá ({appliedDiscount.code}):
            </Text>
            <Text style={styles.totalPrice}>
              -{discountValue.toLocaleString()} đ
            </Text>
          </View>
        )}
        <View style={styles.orderContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Thành tiền:</Text>
            <Text style={styles.finalPrice}>
              {finalPrice.toLocaleString()} đ
            </Text>
          </View>

          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>TIẾN HÀNH ĐẶT HÀNG</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: height * 0.02,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
  },
  title: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  supplier: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: width * 0.035,
  },
  price: {
    fontSize: width * 0.05,
    color: '#FF0000',
    marginBottom: 3,
    fontWeight: 'bold',
  },
  priceDiscount: {
    textDecorationColor: 'gray',
    textDecoration: 'line-through',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  button: {
    padding: width * 0.02,
    backgroundColor: '#eee',
    borderRadius: 2,
  },
  buttonText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: width * 0.04,
    marginHorizontal: 10,
  },
  giftContainer: {
    flexDirection: 'row',
    marginBottom: height * 0.02,
    backgroundColor: 'white',
    alignContent: 'center',
    padding: 15,
    gap: 3,
  },
  giftInput: {
    fontSize: width * 0.03,
    color: '#007BFF',
    cursor: 'pointer',
  },
  teamporaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.09,
    backgroundColor: 'white',
    padding: 15,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  orderContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  giftLabel: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
  },
  totalLabel: {
    fontSize: width * 0.045,
    color: 'gray',
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: 'red',
  },
  finalPrice: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  couponSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    marginBottom: 10,
    gap: 10,
  },
  viewCouponText: {
    fontSize: width * 0.04,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  applyDiscountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  discountInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  couponItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderButton: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 3,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  sideTop: {
    flex: 4,
    padding: 10,
  },
  sideBottom: {
    flex: 5,
    backgroundColor: '#CCCCCC',
    justifyContent: 'flex-end',
  },
});

export default OrderScreen;
