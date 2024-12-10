import { React, useState, useEffect } from "react";
import UpdateForm from "./UpdateForm";
import apiURL from "../api";
import "./item.css";

export const Item = ({
  item,
  setItem,
  setSelectItem,
  selectItem,
  setRefresh,
  viewUpdateForm,
  setViewUpdateForm,
  user,
}) => {
  const [clicked, setClicked] = useState(null);
  useEffect(() => {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
      panel.addEventListener('mouseenter', () => {
        panel.querySelector('.panel-collapse').classList.add('show');
      });
      panel.addEventListener('mouseleave', () => {
        panel.querySelector('.panel-collapse').classList.remove('show');
      });
    });

    return () => {
      panels.forEach(panel => {
        panel.removeEventListener('mouseenter', () => {});
        panel.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  async function handleAddToCart() {
    setClicked(true);
    try {
      const response = await fetch(
        `${apiURL}/users/${user.id}/addToCart/${item.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(
        "An error occurred while adding the item to the cart:",
        error
      );
    }
  }

  return (
    <div className="Itemcontainer">
      <div className="row">
        <div className="col-3 item">
          <button className="itemButton">
          <a href="#">{item.name}</a>

          </button>
        </div>
        <div className="col-4 item">
          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <div className="panel panel-default">
              <div className="panel-heading" role="tab" id={`heading${item.id}`}>
                <h4 className="panel-title">
                  <a role="button">
                  Description
                  <br></br>⌵
                  </a>
                </h4>
              </div>
              <div id={`collapse${item.id}`} className="panel-collapse collapse" role="tabpanel" aria-labelledby={`heading${item.id}`}>
                <div className="panel-body">
                  {item.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 item">
          <p>{item.price}</p>
        </div>
        <div className="col-1 item">
          <p>{item.category}</p>
        </div>
        <div className="col-3 image item">
          <img src={item.image} alt={item.name} />
          {selectItem && user ? (
            <div>
              <button className="buttonFour" onClick={handleAddToCart}>
                {clicked ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div>
        {setSelectItem ? (
          <>
          
            <button className="buttonThree" onClick={() => setSelectItem(false)}>Back</button>
            {user ? (
              <button className="buttonThree" onClick={() => setViewUpdateForm((prev) => !prev)}>
                {viewUpdateForm ? "Cancel" : "Update"}
              </button>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}

        {viewUpdateForm && user ? (
          <UpdateForm
            item={item}
            setItem={setItem}
            setSelectItem={setSelectItem}
            setViewUpdateForm={setViewUpdateForm}
            setRefresh={setRefresh}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
