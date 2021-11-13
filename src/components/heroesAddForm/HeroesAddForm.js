import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { heroCreated} from '../heroesList/heroesSlice';
import { selectAll } from '../heroesFilters/filtersSlice';
import store from '../../store';

import { v4 as uuidv4 } from 'uuid';

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const {filterStatusLoading} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandled = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(dispatch(heroCreated(newHero)))
            .catch(err => err);

        // dispatch(heroCreated(newHero));

        setHeroName('');
        setHeroDescr('');
        setHeroElement('');
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Ładowanie elementów</option>
        } else if (status === "error") {
            return <option>Błąd ładowania</option>
        }
        
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandled}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Imię nowego bohatera</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    value={heroName}
                    className="form-control" 
                    id="name" 
                    placeholder="Jak on ma na imię?"
                    onChange= {(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Opis</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    value={heroDescr}
                    placeholder="Co on może robić?"
                    style={{"height": '130px'}}
                    onChange={(e) => setHeroDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Wybierz element bohatera</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option >Posiada element...</option>
                    {renderFilters(filters, filterStatusLoading)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Stworzyć</button>
        </form>
    )
}

export default HeroesAddForm;