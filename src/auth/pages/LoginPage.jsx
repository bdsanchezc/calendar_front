import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm, useAuthStore } from '../../hooks';

const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
}

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
}

export const LoginPage = () => {

  const { errorMessage, startLogin, startRegister } = useAuthStore();
  const { loginEmail, loginPassword, onInputChange : onLoginInputChange } = useForm(loginFormFields);
  const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange : onRegisterInputChange } = useForm(registerFormFields);

  const onLoginSubmit = (event) => {
    event.preventDefault();

    startLogin({
      email: loginEmail, 
      password: loginPassword
    });
  }

  const onRegisterSubmit = (event) => {
    event.preventDefault();

    if(registerPassword2 !== registerPassword) {
      Swal.fire('Error de registro', 'Las constraseñas diligenciadas no son iguales', 'warning');
      return;
    }

    startRegister({
      nombre: registerName,
      email: registerEmail,
      password: registerPassword
    })
  }

  useEffect(() => {
    if(errorMessage !== undefined) {
      Swal.fire('Error en la autenticacion', errorMessage, 'error');
    }
  }, [errorMessage])
  

  return (
    <section className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="p-4 shadow-lg">
        <h2 className="border-bottom border-2 border-primary pb-2">Iniciar sesión</h2>
        <p>Inicia sesión con los datos de tu cuenta</p>

        <form onSubmit={onLoginSubmit}>
          <div className="mb-2">
            <label htmlFor="" className="form-label">Correo electrónico</label>
            <input type="text" name="loginEmail" value={loginEmail} onChange={onLoginInputChange} className="form-control" placeholder="Correo electrónico" />
          </div>
          <div className="mb-2">
            <label htmlFor="" className="form-label">Contraseña</label>
            <input type="password" name="loginPassword" value={loginPassword} onChange={onLoginInputChange} className="form-control" placeholder="Contraseña" />
          </div>
          <button type="submit" className="btn btn-primary">Ingresar</button>
        </form>
      </div>

      <div className="bg-primary p-4">
        <h2 className="border-bottom border-2 border-white pb-2 text-white">Registrarse</h2>
        <p className="text-white">Completa la información para crear una nueva cuenta</p>

        <form onSubmit={onRegisterSubmit}>
          <div className="mb-2">
            <label htmlFor="" className="form-label text-white">Nombre</label>
            <input type="text" name="registerName" value={registerName} onChange={onRegisterInputChange} className="form-control" placeholder="Nombre" />
          </div>
          <div className="mb-2">
            <label htmlFor="" className="form-label text-white">Correo electrónico</label>
            <input type="email" name="registerEmail" value={registerEmail} onChange={onRegisterInputChange} className="form-control" placeholder="Correo electrónico" />
          </div>
          <div className="mb-2">
            <label htmlFor="" className="form-label text-white">Contraseña</label>
            <input type="password" name="registerPassword" value={registerPassword} onChange={onRegisterInputChange} className="form-control" placeholder="Contraseña" />
          </div>
          <div className="mb-2">
            <label htmlFor="" className="form-label text-white">Repetir contraseña</label>
            <input type="password" name="registerPassword2" value={registerPassword2} onChange={onRegisterInputChange} className="form-control" placeholder="Repetir contraseña" />
          </div>
          <button type="submit" className="btn bg-white">Crear cuenta</button>
        </form>
      </div>
    </section>
  )
}

