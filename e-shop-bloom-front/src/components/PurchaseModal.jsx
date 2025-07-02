import { useState } from 'react';
import { FaTimes, FaShoppingCart, FaCheckCircle, FaSpinner } from 'react-icons/fa';

export default function PurchaseModal({ 
  isOpen, 
  onClose, 
  purchaseData, 
  onConfirm, 
  isLoading 
}) {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  if (!isOpen || !purchaseData) return null;

  const { type, course, courses, originalPrice, finalPrice, discount } = purchaseData;
  const isBundle = type === 'all';

  const handleConfirm = () => {
    onConfirm({
      ...purchaseData,
      paymentMethod
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">
              Confirmar Compra
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isLoading}
            >
              <FaTimes className="text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Purchase Summary */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                {isBundle ? 'Paquete Completo' : 'Curso Individual'}
              </h4>
              
              {isBundle ? (
                <div className="space-y-3">
                  {courses?.map((course) => (
                    <div key={course.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                        <FaCheckCircle className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-800">{course.title}</h5>
                        <p className="text-sm text-gray-600">{course.lessons} lecciones</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400 line-through">${course.originalPrice}</div>
                        <div className="font-semibold text-primary">${course.price}</div>
                      </div>
                    </div>
                  ))}
                  
                  {discount && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-green-800 font-medium">Descuento del {discount}%</span>
                        <span className="text-green-600 font-bold">-${(originalPrice - finalPrice).toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <img 
                        src="/public/Helados.png" 
                        alt={course?.title}
                        className="w-8 h-8 object-contain opacity-80"
                      />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800">{course?.title}</h5>
                      <p className="text-sm text-gray-600">{course?.description}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Precio:</span>
                    <div className="text-right">
                      <div className="text-sm text-gray-400 line-through">${course?.originalPrice}</div>
                      <div className="font-bold text-primary text-lg">${course?.price}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Método de Pago</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Tarjeta de Crédito/Débito</div>
                    <div className="text-sm text-gray-600">Visa, MasterCard, American Express</div>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">PayPal</div>
                    <div className="text-sm text-gray-600">Pago seguro con tu cuenta PayPal</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="bank-transfer"
                    checked={paymentMethod === 'bank-transfer'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Transferencia Bancaria</div>
                    <div className="text-sm text-gray-600">Transferencia directa a nuestra cuenta</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Total */}
            <div className="bg-gradient-to-r from-primary to-accent text-white p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total a pagar:</span>
                <div className="text-right">
                  {originalPrice !== finalPrice && (
                    <div className="text-sm opacity-75 line-through">${originalPrice?.toFixed(2)}</div>
                  )}
                  <div className="text-2xl font-bold">${finalPrice?.toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <FaShoppingCart />
                    Confirmar Compra
                  </>
                )}
              </button>
            </div>

            {/* Security Notice */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                🔒 Tu información está protegida con encriptación SSL de 256 bits
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
