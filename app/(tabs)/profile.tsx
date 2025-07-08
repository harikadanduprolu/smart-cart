import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, CreditCard, MapPin, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, Star, Package, Heart, Gift, Truck, Headphones } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const profileStats = [
  { label: 'Orders', value: '24', icon: Package, color: '#0071ce' },
  { label: 'Reviews', value: '18', icon: Star, color: '#ffc220' },
  { label: 'Favorites', value: '47', icon: Heart, color: '#ef4444' },
  { label: 'Points', value: '1,250', icon: Gift, color: '#10b981' }
];

const menuSections = [
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Personal Information', route: '/profile/personal' },
      { icon: CreditCard, label: 'Payment Methods', route: '/profile/payment' },
      { icon: MapPin, label: 'Addresses', route: '/profile/addresses' },
      { icon: Package, label: 'Order History', route: '/profile/orders' }
    ]
  },
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', route: '/profile/notifications', hasSwitch: true },
      { icon: Shield, label: 'Privacy & Security', route: '/profile/privacy' },
      { icon: Settings, label: 'App Settings', route: '/profile/settings' }
    ]
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle, label: 'Help Center', route: '/profile/help' },
      { icon: Headphones, label: 'Contact Support', route: '/profile/support' },
      { icon: Truck, label: 'Track Orders', route: '/profile/tracking' }
    ]
  }
];

export default function ProfileScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleMenuPress = (route: string) => {
    router.push(route);
  };

  const handleLogout = () => {
    // Logout logic
    console.log('Logging out...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150' }}
                style={styles.avatar}
              />
              <View style={styles.onlineIndicator} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>Sarah Johnson</Text>
              <Text style={styles.userEmail}>sarah.johnson@email.com</Text>
              <View style={styles.membershipBadge}>
                <Text style={styles.membershipText}>Walmart+ Member</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Settings size={20} color="#0071ce" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            {profileStats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  <stat.icon size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Walmart+ Banner */}
        <TouchableOpacity style={styles.walmartPlusBanner}>
          <View style={styles.walmartPlusContent}>
            <View style={styles.walmartPlusIcon}>
              <Text style={styles.walmartPlusEmoji}>⚡</Text>
            </View>
            <View style={styles.walmartPlusText}>
              <Text style={styles.walmartPlusTitle}>Walmart+ Benefits</Text>
              <Text style={styles.walmartPlusSubtitle}>Free delivery, member prices & more</Text>
            </View>
            <ChevronRight size={20} color="#ffc220" />
          </View>
        </TouchableOpacity>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuItems}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity 
                  key={itemIndex} 
                  style={styles.menuItem}
                  onPress={() => handleMenuPress(item.route)}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuItemIcon}>
                      <item.icon size={20} color="#64748b" />
                    </View>
                    <Text style={styles.menuItemText}>{item.label}</Text>
                  </View>
                  <View style={styles.menuItemRight}>
                    {item.hasSwitch ? (
                      <Switch
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                        trackColor={{ false: '#f1f5f9', true: '#0071ce' }}
                        thumbColor={notificationsEnabled ? '#ffffff' : '#f4f3f4'}
                      />
                    ) : (
                      <ChevronRight size={16} color="#94a3b8" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <View style={styles.appVersion}>
          <Text style={styles.versionText}>Walmart App v2.4.1</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    backgroundColor: '#10b981',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  membershipBadge: {
    backgroundColor: '#ffc220',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  membershipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
  },
  editButton: {
    backgroundColor: '#f0f9ff',
    borderRadius: 20,
    padding: 8,
  },
  statsSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    borderRadius: 20,
    padding: 12,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  walmartPlusBanner: {
    backgroundColor: '#1e293b',
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  walmartPlusContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walmartPlusIcon: {
    backgroundColor: 'rgba(255, 194, 32, 0.2)',
    borderRadius: 20,
    padding: 8,
    marginRight: 16,
  },
  walmartPlusEmoji: {
    fontSize: 20,
  },
  walmartPlusText: {
    flex: 1,
  },
  walmartPlusTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  walmartPlusSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
  menuSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  menuItems: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  menuItemRight: {
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    marginLeft: 8,
  },
  appVersion: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  versionText: {
    fontSize: 12,
    color: '#94a3b8',
  },
});