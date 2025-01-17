import React, { useState } from 'react'
import { useEffect } from 'react';
import Cards from '../components/Cards'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  let [search, setSearch] = useState("");
  let [foodCat, setFoodCat] = useState([]);
  let [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("https://foodmernappbackend.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    response = await response.json();
    console.log(response[0], response[1])
    setFoodItem(response[0])
    setFoodCat(response[1])


  };

  useEffect(() => {
    loadData()
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id="carousel">
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value = {search} onChange = {(e)=>{setSearch(e.target.value)}}/>
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://plus.unsplash.com/premium_photo-1672242676665-39db88975682?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8" className="d-block w-100" style={{ filter: "brightness(30%)" }} />
            </div>
            <div className="carousel-item">
              <img src="https://plus.unsplash.com/premium_photo-1673581152365-788c26c1dad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8" className="d-block w-100" style={{ filter: "brightness(30%)" }} />
            </div>
            <div className="carousel-item">
              <img src="https://plus.unsplash.com/premium_photo-1672198597143-45a4b5f064c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8" className="d-block w-100" style={{ filter: "brightness(30%)" }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      <div className='container'>
        {
          foodCat != []?
          foodCat.map((data)=>{
            return (<div className='row mb-3'>
            <div key ={data._id} className='fs-3 m-3'>
              {data.CategoryName}
            </div>
            <hr/>
            {foodItem != []?
            foodItem.filter((item => (item.CategoryName===data.CategoryName) && (item.name.toLowerCase().includes(search))))
            .map(filterItems => {
              return (
                <div key = {filterItems._id} className='col-12 col-md-6 col-lg-3 me-3 mx-3'>
                  <Cards foodItems = {filterItems}
                  options = {filterItems.options[0]}
                  ></Cards>
                  </div>
              )
            }):<div>No such data found</div>}
            </div>
            )
          }):<div>""""""""""</div>
        }
      </div>
      <div><Footer /></div>
    </div>
    </div>
  )
}
