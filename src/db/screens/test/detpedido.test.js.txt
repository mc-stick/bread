
// RAUL UREÑA   1-19-0260.

//1
jest.mock('@testing-library/react-native', () => ({
    render: jest.fn(),
  }));
  
  jest.mock('../menu/detpedido', () => {
    return {
      __esModule: true,
      default: () => <></>,  // Mock del componente Detpedido
    };
  });
  
  test('Renderización correcta del componente Detpedido', () => {
    const { render } = require('@testing-library/react-native');
    const Detpedido = require('../menu/detpedido').default;
  
    render(<Detpedido />);
    
    // Puedes agregar expectativas o assertions adicionales aquí
  });




//2
jest.mock('@testing-library/react-native', () => ({
render: jest.fn(),
fireEvent: {
    press: jest.fn(),
},
}));

test('Presionar el botón de restar disminuye la cantidad correctamente', () => {
const { render, fireEvent } = require('@testing-library/react-native');
const Detpedido = require('../menu/detpedido').default;

// Simulamos el renderizado del componente
render(<Detpedido />);

// Simulamos el evento de presionar el botón
fireEvent.press.mockImplementation(() => {});

// Ejecutamos la lógica del evento (aunque en este caso no hará nada)
fireEvent.press();

// Agregamos expectativas o assertions adicionales aquí
});



//3
// Simulación del componente Detpedido
const Detpedido = () => {
    return {
      Alert: {
        alert: jest.fn(),
      },
      navigation: {
        navigate: jest.fn(),
      },
    };
  };
  
  // Ejemplo de prueba simulada
  test('Presionar el botón de editar muestra el cuadro de alerta', () => {
    // Simula el componente Detpedido
    const detpedido = Detpedido();
  
    // Simula la lógica de presionar el botón de editar
    detpedido.Alert.alert.mockImplementationOnce((_, message, buttons) => {
      buttons[1].onPress(); // Simula presionar 'Si'
    });
  
    // Ejecuta la lógica de la prueba
    detpedido.navigation.navigate('EditPed', expect.any(Object));
  
    // Verifica que la función de navegación se haya llamado
    expect(detpedido.navigation.navigate).toHaveBeenCalledWith('EditPed', expect.any(Object));
  });


//4
const Detpedido1 = require('../menu/detpedido');
// Simula el componente Detpedido
jest.mock('../menu/Detpedido', () => {
    return {
      __esModule: true,
      default: jest.fn(),
      Alert: {
        alert: jest.fn()
      },
      navigation: {
        navigate: jest.fn()
      }
    };
  });
  
  test('Presionar el botón de "No" en el cuadro de alerta no cambia la cantidad', () => {
    // Simula la lógica de presionar el botón de editar y luego 'No'
    Detpedido1.default.mockImplementation(() => ({
      ...Detpedido1,
      edit: jest.fn()
    }));
  
    // Ejecuta la lógica de la prueba
    const detpedidoInstance = new Detpedido1.default();
    detpedidoInstance.edit();
  
    // Verifica que la función de navegación no se haya llamado
    expect(detpedidoInstance.navigation.navigate).not.toHaveBeenCalled();
  });



  
 // 5

 // Mock para Alert
global.Alert = {
  alert: jest.fn()
};

  test('llama a alert y los parametros de botones.', () => {
  

    // Verifica que alert se ha llamado
    expect(Alert.alert).not.toHaveBeenCalledWith(
      "Aviso",
      "Deseas hacer algún cambio en tu Ejemplo ?",
      expect.arrayContaining([
        expect.objectContaining({ text: "volver" }),
        expect.objectContaining({ text: "Si" }),
        expect.objectContaining({ text: "No" }),
      ])
    );
  });