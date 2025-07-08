import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Package, Truck, CircleCheck as CheckCircle, Clock, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const orderStatuses = [
  { key: 'all', label: 'All Orders', count: 24 },
  { key: 'processing', label: 'Processing', count: 2 },
  { key: 'shipped', label: 'Shipped', count: 3 },
  { key: 'delivered', label: 'Delivered', count: 19 }
];

const orders = [
  {
    id: 'WM-2024-001',
    status: 'delivered',
    statusText: 'Delivered',
    date: '2024-01-15',
    total: 127.89,
    itemCount: 5,
    estimatedDelivery: 'Delivered on Jan 15',
    items: [
      { name: 'iPhone 15 Pro Max', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=100&h=100', quantity: 1 },
      { name: 'AirPods Pro', image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=100&h=100', quantity: 1 }
    ]
  },
  {
    id: 'WM-2024-002',
    status: 'shipped',
    statusText: 'Shipped',
    date: '2024-01-18',
    total: 89.47,
    itemCount: 3,
    estimatedDelivery: 'Expected Jan 20',
    items: [
      { name: 'Nike Air Max', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100&h=100', quantity: 1 },
      { name: 'Workout Gear', image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=100&h=100', quantity: 2 }
    ]
  },
  {
    id: 'WM-2024-003',
    status: 'processing',
    statusText: 'Processing',
    date: '2024-01-19',
    total: 234.56,
    itemCount: 8,
    estimatedDelivery: 'Expected Jan 22',
    items: [
      { name: 'KitchenAid Mixer', image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=100&h=100', quantity: 1 },
      { name: 'Baking Supplies', image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=100&h=100', quantity: 7 }
    ]
  },
  {
    id: 'WM-2024-004',
    status: 'delivered',
    statusText: 'Delivered',
    date: '2024-01-12',
    total: 45.23,
    itemCount: 12,
    estimatedDelivery: 'Delivered on Jan 12',
    items: [
      { name: 'Grocery Items', image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=100&h=100', quantity: 12 }
    ]
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'processing':
      return <Clock size={16} color="#f59e0b" />;
    case 'shipped':
      return <Truck size={16} color="#3b82f6" />;
    case 'delivered':
      return <CheckCircle size={16} color="#10b981" />;
    default:
      return <Package size={16} color="#6b7280" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'processing':
      return '#f59e0b';
    case 'shipped':
      return '#3b82f6';
    case 'delivered':
      return '#10b981';
    default:
      return '#6b7280';
  }
};

export default function OrdersScreen() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Status Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusTabs}>
        {orderStatuses.map((status) => (
          <TouchableOpacity
            key={status.key}
            style={[
              styles.statusTab,
              selectedStatus === status.key && styles.activeStatusTab
            ]}
            onPress={() => setSelectedStatus(status.key)}
          >
            <Text style={[
              styles.statusTabText,
              selectedStatus === status.key && styles.activeStatusTabText
            ]}>
              {status.label}
            </Text>
            <View style={[
              styles.statusCount,
              selectedStatus === status.key && styles.activeStatusCount
            ]}>
              <Text style={[
                styles.statusCountText,
                selectedStatus === status.key && styles.activeStatusCountText
              ]}>
                {status.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredOrders.map((order) => (
          <TouchableOpacity key={order.id} style={styles.orderCard}>
            {/* Order Header */}
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderId}>Order {order.id}</Text>
                <Text style={styles.orderDate}>{new Date(order.date).toLocaleDateString()}</Text>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <MoreHorizontal size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Order Status */}
            <View style={styles.orderStatus}>
              <View style={styles.statusIndicator}>
                {getStatusIcon(order.status)}
                <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                  {order.statusText}
                </Text>
              </View>
              <Text style={styles.estimatedDelivery}>{order.estimatedDelivery}</Text>
            </View>

            {/* Order Items */}
            <View style={styles.orderItems}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {order.items.map((item, index) => (
                  <View key={index} style={styles.orderItem}>
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                    {item.quantity > 1 && (
                      <View style={styles.quantityBadge}>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                      </View>
                    )}
                  </View>
                ))}
                {order.itemCount > order.items.length && (
                  <View style={styles.moreItems}>
                    <Text style={styles.moreItemsText}>
                      +{order.itemCount - order.items.length} more
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>

            {/* Order Footer */}
            <View style={styles.orderFooter}>
              <View style={styles.orderTotal}>
                <Text style={styles.totalLabel}>{order.itemCount} items</Text>
                <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
              </View>
              <View style={styles.orderActions}>
                <TouchableOpacity style={styles.trackButton}>
                  <Truck size={16} color="#0071ce" />
                  <Text style={styles.trackButtonText}>Track</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reorderButton}>
                  <Text style={styles.reorderButtonText}>Reorder</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredOrders.length === 0 && (
          <View style={styles.emptyState}>
            <Package size={64} color="#d1d5db" />
            <Text style={styles.emptyStateTitle}>No orders found</Text>
            <Text style={styles.emptyStateSubtitle}>
              {selectedStatus === 'all' 
                ? "You haven't placed any orders yet"
                : `No ${selectedStatus} orders found`
              }
            </Text>
            <TouchableOpacity 
              style={styles.shopNowButton}
              onPress={() => router.push('/search')}
            >
              <Text style={styles.shopNowButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  statusTabs: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  statusTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
  },
  activeStatusTab: {
    backgroundColor: '#0071ce',
  },
  statusTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginRight: 8,
  },
  activeStatusTabText: {
    color: '#ffffff',
  },
  statusCount: {
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  activeStatusCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statusCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  activeStatusCountText: {
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 14,
    color: '#64748b',
  },
  moreButton: {
    padding: 4,
  },
  orderStatus: {
    marginBottom: 16,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  estimatedDelivery: {
    fontSize: 14,
    color: '#64748b',
  },
  orderItems: {
    marginBottom: 16,
  },
  orderItem: {
    position: 'relative',
    marginRight: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  quantityBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#0071ce',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  moreItems: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
  },
  moreItemsText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0071ce',
  },
  orderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  trackButtonText: {
    color: '#0071ce',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  reorderButton: {
    backgroundColor: '#0071ce',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  reorderButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  shopNowButton: {
    backgroundColor: '#0071ce',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  shopNowButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});