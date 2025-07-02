import { useState, useCallback } from 'react';
import { purchaseService } from '../services/api';

export const usePurchaseManager = () => {
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [purchaseError, setPurchaseError] = useState(null);

  const processIndividualPurchase = useCallback(async (courseId, userId) => {
    setPurchaseLoading(true);
    setPurchaseError(null);

    try {
      const purchaseData = {
        type: 'individual',
        courseId,
        userId,
        timestamp: new Date().toISOString()
      };

      const result = await purchaseService.purchaseIndividualCourse(purchaseData);
      return result;
    } catch (error) {
      setPurchaseError(error.message);
      throw error;
    } finally {
      setPurchaseLoading(false);
    }
  }, []);

  const processAllCoursesPurchase = useCallback(async (courseIds, userId) => {
    setPurchaseLoading(true);
    setPurchaseError(null);

    try {
      const purchaseData = {
        type: 'bundle',
        courseIds,
        userId,
        discountPercentage: 30,
        timestamp: new Date().toISOString()
      };

      const result = await purchaseService.purchaseAllCourses(purchaseData);
      return result;
    } catch (error) {
      setPurchaseError(error.message);
      throw error;
    } finally {
      setPurchaseLoading(false);
    }
  }, []);

  return {
    purchaseLoading,
    purchaseError,
    processIndividualPurchase,
    processAllCoursesPurchase,
    clearError: () => setPurchaseError(null)
  };
};
