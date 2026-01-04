import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

// Mock data
const mockProperties = {
  properties: [
    {
      id: "prop1",
      type: "House",
      bedrooms: 3,
      price: 750000,
      description: "Beautiful 3 bedroom house",
      location: "London BR1",
      postcode: "BR1",
      pictures: ["img1.jpg"],
      added: "2023-01-15",
      tenure: "Freehold",
      coordinates: { lat: 51.5, lng: -0.1 },
    },
    {
      id: "prop2",
      type: "Flat",
      bedrooms: 2,
      price: 399995,
      description: "Modern 2 bedroom flat",
      location: "London NW1",
      postcode: "NW1",
      pictures: ["img2.jpg"],
      added: "2023-02-20",
      tenure: "Leasehold",
      coordinates: { lat: 51.52, lng: -0.12 },
    },
  ],
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockProperties),
  })
);

describe("Integration Tests - Complete User Flow", () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  test("1. Complete search, favourite, and view flow", async () => {
    render(<App />);

    // 1. Initial load
    await screen.findByText(/Welcome to Property Search/i);

    // 2. Perform search
    fireEvent.change(screen.getByLabelText(/Property Type/i), {
      target: { value: "House" },
    });
    fireEvent.click(screen.getByText(/Search Properties/i));

    await waitFor(() => {
      expect(
        screen.getByText(/Available Properties \(1\)/i)
      ).toBeInTheDocument();
    });

    // 3. Add to favourites
    const favouriteButton = screen.getByLabelText(/Add to favourites/i);
    fireEvent.click(favouriteButton);

    expect(screen.getByText(/Favourites \(1\)/i)).toBeInTheDocument();

    // 4. View property details
    const viewButton = screen.getByText(/View Details/i);
    fireEvent.click(viewButton);

    expect(screen.getByText(/Beautiful 3 bedroom house/i)).toBeInTheDocument();

    // 5. Navigate back
    const backButton = screen.getByText(/← Back to Search/i);
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Available Properties \(1\)/i)
      ).toBeInTheDocument();
    });
  });

  test("2. Multiple criteria search and favourites persistence", async () => {
    render(<App />);

    await screen.findByText(/Welcome to Property Search/i);

    // Complex search
    fireEvent.change(screen.getByLabelText(/Property Type/i), {
      target: { value: "Flat" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Min price/i), {
      target: { value: "300000" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Max price/i), {
      target: { value: "500000" },
    });

    fireEvent.click(screen.getByText(/Search Properties/i));

    await waitFor(() => {
      expect(
        screen.getByText(/Available Properties \(1\)/i)
      ).toBeInTheDocument();
    });

    // Add to favourites
    const favouriteButton = screen.getByLabelText(/Add to favourites/i);
    fireEvent.click(favouriteButton);

    // Verify localStorage was updated
    const savedFavourites = JSON.parse(
      localStorage.getItem("propertyFavourites")
    );
    expect(savedFavourites).toHaveLength(1);
    expect(savedFavourites[0].id).toBe("prop2");
  });

  test("3. Drag and drop simulation", async () => {
    render(<App />);

    await screen.findByText(/Welcome to Property Search/i);
    fireEvent.click(screen.getByText(/Search Properties/i));

    await waitFor(() => {
      expect(
        screen.getByText(/Available Properties \(2\)/i)
      ).toBeInTheDocument();
    });

    // Simulate drag start
    const propertyCard = document.querySelector(".property-card");
    const dragStartEvent = new Event("dragstart");
    Object.defineProperty(dragStartEvent, "dataTransfer", {
      value: { setData: jest.fn() },
    });

    fireEvent(propertyCard, dragStartEvent);

    // Simulate drop on favourites
    const favouritesList = document.querySelector(".favourites-list");
    const dropEvent = new Event("drop");
    Object.defineProperty(dropEvent, "dataTransfer", {
      value: { getData: jest.fn(() => "prop1") },
    });

    fireEvent(favouritesList, dropEvent);

    // Should have added to favourites
    await waitFor(() => {
      expect(screen.getByText(/Favourites \(1\)/i)).toBeInTheDocument();
    });
  });

  test("4. Responsive layout changes", async () => {
    render(<App />);

    await screen.findByText(/Welcome to Property Search/i);

    // Check desktop layout
    const mainContent = document.querySelector(".main-content");
    expect(mainContent).toHaveStyle("grid-template-columns: 300px 1fr");

    // Check responsive CSS classes exist
    expect(document.querySelector(".search-form")).toBeInTheDocument();
    expect(document.querySelector(".properties-grid")).toBeInTheDocument();
  });

  test("5. Security and error handling", async () => {
    // Test with fetch error
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network error"))
    );

    render(<App />);

    // Should handle error gracefully
    await waitFor(() => {
      expect(
        screen.getByText(/Welcome to Property Search/i)
      ).toBeInTheDocument();
    });

    // Check security elements
    expect(screen.getByText(/Client-Side Security/i)).toBeInTheDocument();
  });
});
