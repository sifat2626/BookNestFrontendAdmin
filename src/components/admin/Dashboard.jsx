import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import Loader from "../loader/Loader";
import axios from "axios";
export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [orderOfLastSevenDays, setOrderOfLastSevenDays] = useState([]);
  const [orderOfCurrentDay, setOrderOfCurrentDay] = useState([]);
  const [todaysCollection,setTodaysCollection] = useState([]);
  const [yesterdaysCollection,setYesterdaysCollection] = useState([]);
  const fetchLastSevenDaysData = async () => {
    setLoading(true);
    const res = await axios.get("/lastsevendaysordercount");
    setOrderOfLastSevenDays(res.data);
    setLoading(false);
  };
  const fetchOrderOfCurrentDay = async () => {
    setLoading(true);
    const res = await axios.get("/orderstateforcurrentday");
    setOrderOfCurrentDay(res.data);
    setLoading(false);
  };

  const fetchTodaysCollection= async()=>{
  try{
    const res = await axios.get("/amountreceivedfortoday");
    setTodaysCollection(res.data);
    } catch (error) {
      console.log('error', error.message);
      
    }
  }
  const fetchYesterDaysCollection= async()=>{
  try{
    const res = await axios.get("/amountReceivedPerDay/1");
    setYesterdaysCollection(res.data);
    console.log('yesterday',res.data);
    
    } catch (error) {
      console.log('error', error.message);
      
    }
  }
  useEffect(() => {
    fetchLastSevenDaysData();
    fetchOrderOfCurrentDay();
    fetchTodaysCollection();
    fetchYesterDaysCollection();
  }, []);

  const orderOfCurrentDayData = {
    labels: orderOfCurrentDay?.map((data) => data?.status),
    datasets: [
      {
        label: "Todays Order Status",
        data: orderOfCurrentDay.map((data) => {
          if (data.status === "Pending") {
            return data.count + 1;
          } else {
            return data.count;
          }
        }),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  const orderOfLastSevenDaysData = {
    labels: orderOfLastSevenDays?.map((data) => data?.day),
    datasets: [
      {
        label: "Order of last seven days",
        data: orderOfLastSevenDays?.map((data) => data?.count),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <div className="row g-3 mb-4 align-items-center justify-content-between">
              <div className="col-auto">
                <h1 className="app-page-title mb-0">Dashboard</h1>
              </div>
              {/*
                cards
              */}
              <div className="row g-4 mb-4">
                <div className="col-12 col-lg-6">
                  <div className="app-card app-card-basic d-flex flex-column align-items-center shadow-sm">
                    <div className="app-card-header p-3 border-bottom-0">
                      <div className="row align-items-center gx-3">
                        <div className="col-auto">
                          <div className="app-icon-holder">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-receipt"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"
                              />
                              <path
                                fillRule="evenodd"
                                d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="col-auto">
                          <h4 className="app-card-title">Today's Collection</h4>
                        </div>
                      </div>
                    </div>
                    <div className="app-card-body p-3 p-lg-4">
                      <div className="row g-4 mb-4 align-items-center justify-content-between">
                        <div className="col-auto">
                          <h1 className="text-sm-center">
                          {todaysCollection.length > 0 ? (todaysCollection[0].totalAmount).toLocaleString('bn-BD') : 0} 
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="app-card app-card-basic d-flex flex-column align-items-center shadow-sm">
                    <div className="app-card-header p-3 border-bottom-0">
                      <div className="row align-items-center gx-3">
                        <div className="col-auto">
                          <div className="app-icon-holder">
                          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bar-chart-line" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z"></path>
                        </svg>
                          </div>
                        </div>
                        <div className="col-auto">
                          <h4 className="app-card-title">Previous Day's Collection</h4>
                        </div>
                      </div>
                    </div>
                    <div className="app-card-body p-3 p-lg-4">
                      <div className="row g-4 mb-4 align-items-center justify-content-between">
                        <div className="col-auto">
                          <h1 className="text-sm-center">{
                           yesterdaysCollection.length > 0 ? (yesterdaysCollection[0].totalAmount).toLocaleString('bn-BD') : 0
                          }</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*
              charts
            */}
              <div className="row g-4 mb-4">
                <div className="col-12 col-lg-6">
                  <div className="app-card app-card-chart h-100 shadow-sm">
                    <div className="app-card-header p-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <h4 className="app-card-title">
                            Order Of Last Seven Days
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="app-card-body p-3 p-lg-4">
                      <div className="chart-container">
                        <div className="chartjs-size-monitor">
                          <div className="chartjs-size-monitor-expand">
                            <div className />
                          </div>
                          <div className="chartjs-size-monitor-shrink">
                            <div className />
                          </div>
                        </div>

                        <BarChart chartData={orderOfLastSevenDaysData} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="app-card app-card-chart h-100 shadow-sm">
                    <div className="app-card-header p-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <h4 className="app-card-title">
                            Order State Of Current Day
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="app-card-body p-3 p-lg-4">
                      <div className="chart-container">
                        <div className="chartjs-size-monitor">
                          <div className="chartjs-size-monitor-expand">
                            <div className />
                          </div>
                          <div className="chartjs-size-monitor-shrink">
                            <div className />
                          </div>
                        </div>

                        <LineChart chartData={orderOfCurrentDayData} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
