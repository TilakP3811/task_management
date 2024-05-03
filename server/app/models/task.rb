class Task < ApplicationRecord
  PER_PAGE = 10

  validates :title, presence: true

  scope :ordered, ->(page = 1) { order(created_at: :desc).page(page).per(PER_PAGE) }

  state_machine :status, initial: :to_do do
    state :to_do, value: 0
    state :in_progress, value: 1
    state :done, value: 2

    event :start do
      transition to_do: :in_progress
    end

    event :complete do
      transition in_progress: :done
    end
  end
end
