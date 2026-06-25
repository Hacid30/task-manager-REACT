import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTasks } from './useTasks';

describe('Pruebas unitarias para useTasks', () => {
    
    // Limpiamos el localStorage antes de cada prueba para mantener un entorno limpio
    beforeEach(() => {
        localStorage.clear();
    });

    it('Debería inicializar con una lista de tareas vacía', () => {
        const { result } = renderHook(() => useTasks());
        expect(result.current.tasks).toEqual([]);
    });

    it('Debería agregar una tarea correctamente con su texto y prioridad', () => {
        const { result } = renderHook(() => useTasks());

        // Usamos act() para envolver cualquier acción que actualice el estado
        act(() => {
            result.current.addTask('Aprender Testing con Vitest', 'alta');
        });

        expect(result.current.tasks.length).toBe(1);
        expect(result.current.tasks[0].text).toBe('Aprender Testing con Vitest');
        expect(result.current.tasks[0].priority).toBe('alta');
        expect(result.current.tasks[0].completed).toBe(false);
    });

    it('Debería cambiar el estado de completado al invocar toggleTask', () => {
        const { result } = renderHook(() => useTasks());

        act(() => {
            result.current.addTask('Tarea Interactiva', 'media');
        });

        const taskId = result.current.tasks[0].id;

        act(() => {
            result.current.toggleTask(taskId);
        });

        expect(result.current.tasks[0].completed).toBe(true);
    });
});