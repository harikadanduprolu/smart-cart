import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Clock, Users, ChefHat, Plus, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const mockRecipe = {
  name: 'Spaghetti Carbonara',
  image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
  cookTime: '20 mins',
  servings: 4,
  difficulty: 'Easy',
  ingredients: [
    { id: 1, name: 'Spaghetti pasta, 1 lb', price: 1.98, inStock: true, walmartProduct: 'Great Value Spaghetti, 1 lb' },
    { id: 2, name: 'Bacon, 8 slices', price: 4.98, inStock: true, walmartProduct: 'Wright Brand Bacon, 12 oz' },
    { id: 3, name: 'Eggs, 4 large', price: 2.88, inStock: true, walmartProduct: 'Great Value Large Eggs, 18 count' },
    { id: 4, name: 'Parmesan cheese, grated, 1 cup', price: 3.98, inStock: true, walmartProduct: 'Kraft Parmesan Cheese, 8 oz' },
    { id: 5, name: 'Heavy cream, 1/2 cup', price: 2.68, inStock: true, walmartProduct: 'Great Value Heavy Cream, 16 oz' },
    { id: 6, name: 'Garlic, 3 cloves', price: 0.98, inStock: false, walmartProduct: 'Fresh Garlic, 3 pack' },
    { id: 7, name: 'Black pepper', price: 1.48, inStock: true, walmartProduct: 'Great Value Black Pepper, 2.5 oz' },
    { id: 8, name: 'Salt', price: 0.88, inStock: true, walmartProduct: 'Morton Salt, 26 oz' }
  ]
};

export default function RecipeBasketScreen() {
  const router = useRouter();
  const [selectedIngredients, setSelectedIngredients] = useState(
    mockRecipe.ingredients.filter(ingredient => ingredient.inStock).map(ingredient => ingredient.id)
  );
  const [basketName, setBasketName] = useState(`${mockRecipe.name} Ingredients`);

  const toggleIngredient = (ingredientId: number) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredientId) 
        ? prev.filter(id => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  const getSelectedTotal = () => {
    return mockRecipe.ingredients
      .filter(ingredient => selectedIngredients.includes(ingredient.id))
      .reduce((total, ingredient) => total + ingredient.price, 0);
  };

  const createBasket = () => {
    // Create basket with selected ingredients
    router.back();
  };

  const addToCart = () => {
    // Add selected ingredients to cart
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recipe Basket</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Recipe Header */}
        <View style={styles.recipeHeader}>
          <Image source={{ uri: mockRecipe.image }} style={styles.recipeImage} />
          <View style={styles.recipeOverlay}>
            <Text style={styles.recipeName}>{mockRecipe.name}</Text>
            <View style={styles.recipeStats}>
              <View style={styles.recipeStat}>
                <Clock size={16} color="#ffffff" />
                <Text style={styles.recipeStatText}>{mockRecipe.cookTime}</Text>
              </View>
              <View style={styles.recipeStat}>
                <Users size={16} color="#ffffff" />
                <Text style={styles.recipeStatText}>{mockRecipe.servings} servings</Text>
              </View>
              <View style={styles.recipeStat}>
                <ChefHat size={16} color="#ffffff" />
                <Text style={styles.recipeStatText}>{mockRecipe.difficulty}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Banner */}
        <View style={styles.actionBanner}>
          <View style={styles.actionBannerContent}>
            <Text style={styles.actionBannerTitle}>Want to cook this?</Text>
            <Text style={styles.actionBannerSubtitle}>
              We'll help you create a shopping basket with all the ingredients
            </Text>
          </View>
        </View>

        {/* Basket Name Input */}
        <View style={styles.basketNameSection}>
          <Text style={styles.sectionTitle}>Basket Name</Text>
          <TextInput
            style={styles.basketNameInput}
            value={basketName}
            onChangeText={setBasketName}
            placeholder="Enter basket name"
          />
        </View>

        {/* Ingredients List */}
        <View style={styles.ingredientsSection}>
          <View style={styles.ingredientsHeader}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <Text style={styles.ingredientsSubtitle}>
              {selectedIngredients.length} of {mockRecipe.ingredients.length} selected
            </Text>
          </View>

          {mockRecipe.ingredients.map((ingredient) => {
            const isSelected = selectedIngredients.includes(ingredient.id);
            return (
              <TouchableOpacity
                key={ingredient.id}
                style={[styles.ingredientCard, isSelected && styles.ingredientCardSelected]}
                onPress={() => toggleIngredient(ingredient.id)}
                disabled={!ingredient.inStock}
              >
                <View style={[styles.ingredientCheckbox, isSelected && styles.ingredientCheckboxSelected]}>
                  {isSelected && <Check size={16} color="#ffffff" />}
                </View>
                
                <View style={styles.ingredientInfo}>
                  <Text style={[styles.ingredientName, !ingredient.inStock && styles.ingredientNameUnavailable]}>
                    {ingredient.name}
                  </Text>
                  <Text style={styles.walmartProduct}>{ingredient.walmartProduct}</Text>
                  <View style={styles.ingredientMeta}>
                    <Text style={styles.ingredientPrice}>${ingredient.price.toFixed(2)}</Text>
                    {!ingredient.inStock && (
                      <View style={styles.unavailableBadge}>
                        <Text style={styles.unavailableBadgeText}>Out of Stock</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Substitutions */}
        <View style={styles.substitutionsSection}>
          <Text style={styles.sectionTitle}>Suggested Substitutions</Text>
          <Text style={styles.sectionSubtitle}>For out-of-stock items</Text>
          
          <View style={styles.substitutionCard}>
            <Text style={styles.substitutionOriginal}>Garlic (3 cloves) - Out of Stock</Text>
            <Text style={styles.substitutionArrow}>→</Text>
            <View style={styles.substitutionOption}>
              <Text style={styles.substitutionName}>Garlic Powder (1 tsp)</Text>
              <Text style={styles.substitutionPrice}>$1.28</Text>
              <TouchableOpacity style={styles.substitutionAddButton}>
                <Plus size={16} color="#0071ce" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Cooking Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Cooking Tips</Text>
          <View style={styles.tip}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipText}>Cook pasta al dente for best texture</Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipIcon}>🔥</Text>
            <Text style={styles.tipText}>Remove from heat before adding eggs to prevent scrambling</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total for {selectedIngredients.length} ingredients</Text>
          <Text style={styles.totalPrice}>${getSelectedTotal().toFixed(2)}</Text>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.createBasketButton} onPress={createBasket}>
            <Text style={styles.createBasketButtonText}>Create Basket</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  recipeHeader: {
    position: 'relative',
    height: 200,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  recipeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  recipeStats: {
    flexDirection: 'row',
    gap: 16,
  },
  recipeStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeStatText: {
    color: '#ffffff',
    marginLeft: 4,
    fontSize: 14,
  },
  actionBanner: {
    backgroundColor: '#0071ce',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  actionBannerContent: {
    alignItems: 'center',
  },
  actionBannerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  actionBannerSubtitle: {
    fontSize: 14,
    color: '#e0f2fe',
    textAlign: 'center',
  },
  basketNameSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  basketNameInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  ingredientsSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
  },
  ingredientsHeader: {
    marginBottom: 16,
  },
  ingredientsSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  ingredientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    opacity: 0.6,
  },
  ingredientCardSelected: {
    opacity: 1,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    marginHorizontal: -8,
    paddingHorizontal: 8,
  },
  ingredientCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredientCheckboxSelected: {
    backgroundColor: '#0071ce',
    borderColor: '#0071ce',
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  ingredientNameUnavailable: {
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  walmartProduct: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  ingredientMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ingredientPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0071ce',
  },
  unavailableBadge: {
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  unavailableBadgeText: {
    fontSize: 10,
    color: '#dc2626',
    fontWeight: '500',
  },
  substitutionsSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  substitutionCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    padding: 12,
  },
  substitutionOriginal: {
    fontSize: 14,
    color: '#92400e',
    marginBottom: 4,
  },
  substitutionArrow: {
    fontSize: 16,
    color: '#92400e',
    marginBottom: 8,
  },
  substitutionOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  substitutionName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
  },
  substitutionPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0071ce',
    marginRight: 8,
  },
  substitutionAddButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 4,
  },
  tipsSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  bottomActions: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0071ce',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  createBasketButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#0071ce',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  createBasketButtonText: {
    color: '#0071ce',
    fontWeight: '600',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#0071ce',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  addToCartButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});