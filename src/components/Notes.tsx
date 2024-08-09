import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import {useLocation} from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Notes = () => {
    const location = useLocation();
    console.log(location)
    const [title, setTitle] = useState(location?.state?.type === true ? location?.state?.title : '');
    const [content, setContent] = useState(location?.state?.content || '');
    const [isEdit, setIsEdit] = useState(false);

    const handleSubmit = async () => {
        try {
            if (!location?.state?.type) {
                // Lógica para editar nota
                const response = await axios.put(`http://127.0.0.1:8000/note/api/note/notes/${location?.state?.id}/`, {
                    title,
                    content,
                });
                console.log(response.data);
                setIsEdit(true);
                Swal.fire({
                    title: 'Nota editada con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });
            } else {
                // Lógica para agregar nota
                const response = await axios.post('http://127.0.0.1:8000/note/api/note/notes/', {
                    title,
                    content,
                });
                console.log(response.data);
                setIsEdit(true);
                Swal.fire({
                    title: 'Nota agregada con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });
            }
            setTitle('');
            setContent('');
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al guardar la nota',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    };

    return (
      <>
          <Breadcrumb pageName="Notas" />

          <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
              <div className="flex flex-col gap-9">
                  {/* <!-- Input Fields --> */}
              </div>

              <div className="flex flex-col gap-9">
                  {/* <!-- Textarea Fields --> */}
                  <div
                    className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                          <h3 className="font-medium text-black dark:text-white">
                              {!location?.state?.type ? 'Editar Nota' : 'Nueva Nota'}
                          </h3>
                      </div>

                      <div className="flex flex-col gap-5.5 p-6.5">
                              <div>
                                  <label className="mb-3 block text-black dark:text-white">
                                      Titulo
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Titulo"
                                    defaultValue={(location?.state?.type === false || isEdit) ? location?.state?.title : ''}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                  />
                              </div>
                              <div>
                                  <label className="mb-3 block text-black dark:text-white">
                                      Contenido
                                  </label>
                                  <textarea
                                    rows={6}
                                    placeholder="Contenido de la nota"
                                    defaultValue={(location?.state?.type === false || isEdit)  ? location?.state?.content : ''}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                  ></textarea>
                              </div>
                          <div className="flex justify-end gap-4.5">
                              <button
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                                onClick={handleSubmit}
                              >
                                  {!location?.state?.type ? 'Guardar Cambios' : 'Guardar'}
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
    );
};

export default Notes;