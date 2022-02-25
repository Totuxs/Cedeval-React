import {
  Button,
  Card,
  FormGroup,
  FormInput,
  Title,
  Unauthenticated,
} from '@src/components';
import { useAuth } from '@src/hooks';
import { LoginForm } from '@src/interfaces';
import { FunctionComponent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LoginPage: FunctionComponent = () => {
  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  });

  const { register, handleSubmit } = useForm<LoginForm>();
  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    login(data);
  };
  return (
    <Unauthenticated>
      <div className="container flex items-center justify-center flex-1 mx-auto ">
        <div className="my-6 mx-4 sm:w-[409px]">
          <Card>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex items-center justify-center p-4">
                <div className="w-9/12">
                  <Title className="text-center">
                    Ingresa a tu consulta en línea CEDEVAL
                  </Title>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                  <FormGroup label="Usuario" fieldName="user">
                    <FormInput
                      placeholder="ej. name@container.com"
                      {...register('username')}
                    ></FormInput>
                    {/* {touched.user && errors.user && <div>{t('validations')}</div>} */}
                  </FormGroup>
                  <FormGroup label="Contraseña" fieldName="password">
                    <FormInput
                      placeholder="Password"
                      type="password"
                      {...register('password')}
                    ></FormInput>
                    {/* {touched.password && errors.password && (
                    <div>{t('validations')}</div>
                  )} */}
                  </FormGroup>
                  <FormGroup>
                    <div className="grid mt-4">
                      <Button type="submit" style="primary">
                        Ingresar
                      </Button>
                    </div>
                  </FormGroup>
                </div>
              </form>

              <div className="flex flex-col gap-6 m-2">
                <div className="text-center">
                  <Link to="/recover">
                    <span className="cursor-pointer text-secondary-500">
                      ¿Usuario bloqueado u olvidaste tu contraseña?
                    </span>
                  </Link>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Link to="/recover">
                    <span className="cursor-pointer text-secondary-500">
                      ¿Usuario bloqueado u olvidaste tu contraseña?
                    </span>
                  </Link>
                  <span className="text-neutral-500">
                    Si aún no cuentas con usuario activo, favor solicitalo aquí
                  </span>

                  <Link to="/signup">
                    <span className="cursor-pointer text-secondary-500">
                      Regístrate
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Unauthenticated>
  );
};
export default LoginPage;
