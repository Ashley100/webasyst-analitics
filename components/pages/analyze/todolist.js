import React from 'react';

export const TodoList = () => {
    return (
        <div>
            <h1 className="mt-0">Список задач</h1>
            <ol className="ul">
                <li className="mb-12">
                    <strong className="db mb-12 c-orange-1">Позиция в выдаче</strong>
                    <ol>
                        <li>Вывести Select с списком регионов</li>
                        <li>Список </li>
                    </ol>
                </li>
                <li>
                    <strong className="db mb-12 c-orange-1">Поиск конкурентов</strong>
                    <ol>
                        <li>Вывести Select с списком регионов</li>
                    </ol>
                </li>
                <li>
                    <strong className="db mb-12 c-orange-1">Проверка индекцации</strong>
                    <ol>
                        <li>Вывести Select с списком регионов</li>
                    </ol>
                </li>
            </ol>
        </div>
    )
};